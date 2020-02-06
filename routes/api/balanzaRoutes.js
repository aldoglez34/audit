const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");

// uploadBalanza()
// matches with /api/balanza/upload
router.post("/upload", function(req, res) {
  // split file into array
  // \r\n marks the end of a row
  let bigArr = req.body.file.split("\r\n");
  // insert rows
  let insertRows = new Promise((resolve, reject) => {
    bigArr.forEach((value, index, array) => {
      // split the row in an array
      let row = value.split(",");
      // create the record in the db
      model.Balanza.create({
        auditId: req.body.auditId,
        month: row[0].replace('"', "").trim(),
        cuentaContable: row[1].replace('"', "").trim(),
        cuentaDescripción: row[2].replace('"', "").trim(),
        saldoInicial: Number(row[3]),
        cargos: Number(row[4]),
        abonos: Number(row[5]),
        saldoFinal: Number(row[6])
      })
        .then(() => {
          if (index === array.length - 1) resolve();
        })
        .catch(err => {
          console.log("@create.catch ->", err);
          reject("@reject -> Ocurrió un error");
        });
    });
  });
  //
  insertRows
    .then(() => {
      // consult the information and make validations
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
        .then(res => {
          console.log("@report -> ", res);
        })
        .catch(err => console.log(err));

      // model.Audit.update(
      //   { hasBalanza: true },
      //   { where: { auditId: req.body.auditId } }
      // )
      //   .then(res => res.json(res))
      //   .catch(err => res.json(err));
    })
    .catch(err => console.log(err));
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
