const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");
const validateBalanza = require("../middleware/validateBalanza");
const balanzaReports = require("../scripts/balanzaReports");

// uploadBalanza()
// matches with /api/balanza/upload
// this route will recieve the balanza, validate errors
// then it will insert it into the database
// after it's inserted it will generate a monthly report and validate it
// if the monthly report fails, it will have to delete it from the database and send the report
// if everything is ok, it will update the audit table and then send the report
router.post("/upload", validateBalanza(), function(req, res, next) {
  // split file into array, \r\n marks the end of a row
  const balanza = req.body.file.split("\r\n");

  // if hasHeaders is true, delete the first row
  if (req.body.hasHeaders) balanza.shift();

  // if last row is empty, delete it
  if (!balanza[balanza.length - 1]) balanza.pop();

  // generate array of objects
  const balanzaArrOfObjs = balanza.reduce((acc, cv) => {
    let row = cv.split(",");
    return acc.concat({
      auditId: req.body.auditId,
      month: row[0].toUpperCase(),
      cuentaContable: row[1],
      cuentaDescripción: row[2].trim(),
      saldoInicial: parseFloat(parseFloat(row[3]).toFixed(2)),
      cargos: parseFloat(parseFloat(row[4]).toFixed(2)),
      abonos: parseFloat(parseFloat(row[5]).toFixed(2)),
      saldoFinal: parseFloat(parseFloat(row[6]).toFixed(2))
    });
  }, []);

  console.log("@balanzaArrOfObjs", balanzaArrOfObjs);
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
