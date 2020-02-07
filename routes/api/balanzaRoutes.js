const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");

const formatStringValue = value => {
  // if (value === undefined) return "???";
  if (typeof value !== "string") return "???";
  return value.replace('"', "").trim();
};

const formatFloatValue = value => {
  if (typeof value === "string") {
    value = parseFloat(
      parseFloat(value.replace(/,/g, "").replace('"', "")).toFixed(2)
    );
  } else {
    value = parseFloat(parseFloat(value).toFixed(2));
  }
  return value;
};

// uploadBalanza()
// matches with /api/balanza/upload
router.post("/upload", function(req, res) {
  // split file into array, \r\n marks the end of a row
  let fileArr = req.body.file.split("\r\n");
  // if hasHeaders is true, delete the first row
  if (req.body.hasHeaders) fileArr.shift();
  // if last row is empty, delete it
  if (!fileArr[fileArr.length - 1]) fileArr.pop();
  // promise
  let insertRows = new Promise((resolve, reject) => {
    // insert rows
    fileArr.forEach((value, index, array) => {
      // split the row in an array
      let row = value.split(",");
      // format values before introducing them to the db
      let month = formatStringValue(row[0]);
      let cuentaContable = formatStringValue(row[1]);
      let cuentaDescripción = formatStringValue(row[2]);
      let saldoInicial = formatFloatValue(row[3]);
      let cargos = formatFloatValue(row[4]);
      let abonos = formatFloatValue(row[5]);
      let saldoFinal = formatFloatValue(row[6]);
      // create the record in the db
      model.Balanza.create({
        auditId: req.body.auditId,
        month,
        cuentaContable,
        cuentaDescripción,
        saldoInicial,
        cargos,
        abonos,
        saldoFinal
      })
        .then(() => {
          // if it's the last row in the array, resolve
          if (index === array.length - 1) resolve();
        })
        .catch(err => {
          console.log("@create.catch ->", err);
          reject();
          res.send(err);
        });
    });
  });
  // resolving promise
  insertRows
    .then(() => {
      // make a monthly report
      model.Balanza.findAll({
        attributes: [
          "month",
          [Sequelize.fn("sum", Sequelize.col("saldoInicial")), "total_si"],
          [Sequelize.fn("sum", Sequelize.col("cargos")), "total_c"],
          [Sequelize.fn("sum", Sequelize.col("abonos")), "total_a"],
          [Sequelize.fn("sum", Sequelize.col("saldoFinal")), "total_sf"]
        ],
        where: { auditId: req.body.auditId },
        group: ["month"],
        raw: true
      })
        .then(data => {
          // send report to the front end
          res.json(data);
        })
        .catch(err => console.log("@findAll.catch ->", err));

      // model.Audit.update(
      //   { hasBalanza: true },
      //   { where: { auditId: req.body.auditId } }
      // )
      //   .then(data => res.json(data))
      //   .catch(err => res.json(err));
    })
    .catch(err => console.log("@insertRows.catch ->", err));
});

// fetchBalanza()
// matches with /api/balanza/:auditId
router.get("/:auditId", function(req, res) {
  model.Balanza.findAll({ limit: 50, where: { auditId: req.params.auditId } })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
