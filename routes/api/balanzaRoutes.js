const router = require("express").Router();
const model = require("../../models");
const validateBalanza = require("../middleware/balanzaValidation/validateBalanza");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

// uploadBalanza()
// matches with /api/balanza/upload
router.post("/upload", validateBalanza(), function(req, res, next) {
  // split file into array, \r\n marks the end of a row
  let balanza = req.body.file.split("\r\n");

  // if hasHeaders is true, delete the first row
  if (req.body.hasHeaders) balanza.shift();

  // if last row is empty, delete it
  if (!balanza[balanza.length - 1]) balanza.pop();

  // first generate an array of objects with each string in the balanza array
  const balanzaArrOfObjs = balanza.reduce((acc, cv) => {
    // split current value into an array (separated by commas)
    let row = cv.split(",");
    // concat values as an object into the acc array
    return acc.concat({
      auditId: req.body.auditId,
      clientId: req.body.clientId,
      year: req.body.year,
      month: row[0].toUpperCase(),
      cuentaContable: row[1],
      rubro: row[2].trim(),
      cuentaDescripción: row[3].trim(),
      saldoInicial: parseFloat(parseFloat(row[4]).toFixed(2)),
      cargos: parseFloat(parseFloat(row[5]).toFixed(2)),
      abonos: parseFloat(parseFloat(row[6]).toFixed(2)),
      saldoFinal: parseFloat(parseFloat(row[7]).toFixed(2))
    });
  }, []);

  // bulk create balanza into the db
  model.Balanza.bulkCreate(balanzaArrOfObjs)
    // then update the audit table
    .then(() => {
      return model.Audit.update(
        { hasBalanza: true },
        { where: { auditId: req.body.auditId } }
      );
    })
    .then(() =>
      res.send({
        msg: "La balanza fue validada y almacenada de manera satisfactoria"
      })
    )
    .catch(err => res.send(err));
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

// =======================================================
// REPORTS

// balanzaReport_ads()
// matches with /api/balanza/report/ads/:auditId
router.get("/report/ads/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "year",
      "month",
      "rubro",
      "cuentaContable",
      "cuentaDescripción",
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["year", "month", "rubro", "cuentaContable", "cuentaDescripción"],
    where: { auditId: req.params.auditId, month: "DICIEMBRE" },
    order: [
      ["rubro", "ASC"],
      ["cuentaContable", "ASC"]
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// balanzaReport_csdsc()
// matches with /api/balanza/report/csdsc/:clientId/:year
router.get("/report/csdsc/:clientId/:year", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "cuentaContable",
      "year",
      "month",
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["cuentaContable", "year", "month"],
    where: {
      clientId: req.params.clientId,
      year: { [Op.or]: [req.params.year, req.params.year - 1] },
      month: "DICIEMBRE"
    },
    order: [
      ["cuentaContable", "ASC"],
      ["year", "ASC"]
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// balanzaReport_amds()
// matches with /api/balanza/report/amds/:auditId
router.get("/report/amds/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "rubro",
      "cuentaContable",
      "cuentaDescripción",
      "month",
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["rubro", "cuentaContable", "month"],
    where: { auditId: req.params.auditId },
    order: [
      ["rubro", "ASC"],
      ["cuentaContable", "ASC"]
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// balanzaReport_amdm()
// matches with /api/balanza/report/amdm/:auditId
router.get("/report/amds/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "rubro",
      "cuentaContable",
      "cuentaDescripción",
      "month",
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["rubro", "cuentaContable", "month"],
    where: { auditId: req.params.auditId },
    order: [
      ["rubro", "ASC"],
      ["cuentaContable", "ASC"]
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// report_Amdg_topCuentas()
// matches with /api/balanza/report/amdg/topCuentas/:auditId
router.get("/report/amdg/topCuentas/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "cuentaContable",
      "cuentaDescripción",
      [sequelize.fn("sum", sequelize.col("cargos")), "total_cargos"]
    ],
    group: ["cuentaContable"],
    where: { cuentaContable: { [Op.startsWith]: "5" } },
    order: [[sequelize.fn("sum", sequelize.col("cargos")), "DESC"]],
    limit: 10
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// report_Amdg_cuenta()
// matches with /api/balanza/report/amdg/cuenta/:auditId/:cuentaContable
router.get("/report/amdg/cuenta/:auditId/:cuentaContable", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "month",
      "cuentaContable",
      "cuentaDescripción",
      [sequelize.fn("sum", sequelize.col("cargos")), "total_cargos"]
    ],
    group: ["month"],
    where: {
      auditId: req.params.auditId,
      cuentaContable: req.params.cuentaContable
    }
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

module.exports = router;
