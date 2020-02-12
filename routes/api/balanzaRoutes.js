const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");
const balanzaValidations = require("../../scripts/balanzaValidations");
const balanzaReports = require("../../scripts/balanzaReports");

// uploadBalanza()
// matches with /api/balanza/upload
router.post("/upload", function(req, res) {
  // split file into array, \r\n marks the end of a row
  let fileArr = req.body.file.split("\r\n");

  // if hasHeaders is true, delete the first row
  if (req.body.hasHeaders) fileArr.shift();

  // if last row is empty, delete it
  if (!fileArr[fileArr.length - 1]) fileArr.pop();

  // balanzaValidations.validate will return an array in which
  // the first element will be true/false
  // and the second will contain a text description if there was an error
  const [isValid, text] = balanzaValidations.validate(fileArr);

  // if it's not valid, send the msg error to the front end
  if (!isValid) {
    res.send({ error: "Ocurrió un error con tu archivo\n" + text });
  }
  // if theres no error, insert file into db
  else {
    // insert rows Promise
    let insertRows = new Promise((resolve, reject) => {
      fileArr.forEach((value, index, array) => {
        // split the row in an array
        let row = value.split(",");
        // create the record in the db
        model.Balanza.create({
          auditId: req.body.auditId,
          month: row[0].toUpperCase(),
          cuentaContable: row[1],
          cuentaDescripción: row[2].trim(),
          saldoInicial: parseFloat(parseFloat(row[3]).toFixed(2)),
          cargos: parseFloat(parseFloat(row[4]).toFixed(2)),
          abonos: parseFloat(parseFloat(row[5]).toFixed(2)),
          saldoFinal: parseFloat(parseFloat(row[6]).toFixed(2))
        })
          .then(() => {
            // if it's the last row in the array, resolve
            if (index === array.length - 1) resolve();
          })
          .catch(err => {
            reject();
            console.log("@create.catch -", err);
            res.send({ error: "Ocurrió un error con tu archivo" });
          });
      });
    });
    // after Promise is done
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
            // generate monthly report
            let report = balanzaReports(data);

            // check if the report is fine
            let isReportOk = report.every(
              month => month.isSIZero && month.isSFZero && month.isCandATheSame
            );

            if (isReportOk) {
              // update audit and set hasBalanza to true and then send the report
              model.Audit.update(
                { hasBalanza: true },
                { where: { auditId: req.body.auditId } }
              )
                .then(() => res.json(report))
                .catch(err => console.log(err));
            } else {
              // delete balanza from the db and then send the report
              model.Audit.destroy({
                where: { auditId: req.body.auditId }
              })
                .then(() => res.json(report))
                .catch(err => console.log(err));
              // send report
              res.json(report);
            }
          })
          .catch(err => {
            console.log("@findAll.catch ->", err);
            res.send({ error: "Ocurrió un error con tu archivo" });
          });
      })
      .catch(err => {
        console.log("@insertRows.catch ->", err);
        res.send({ error: "Ocurrió un error con tu archivo" });
      });
  }
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
