const router = require("express").Router();
const model = require("../../models");
const validateBalanza = require("../middleware/balanzaValidation/validateBalanza");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const formatNumber = num => {
  return num
    ? num
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : 0;
};

const formatPercentage = num => {
  return num ? Math.round(num) + "%" : 0;
};

const calculatePercentage = ({ saldoFinal, rubro, totalRubros }) => {
  // get the total of that rubro
  let totalRubro = totalRubros.filter(tr => tr.rubro === rubro)[0]
    .total_saldoFinal_raw;

  let percentage = Math.round((saldoFinal / totalRubro) * 100);

  return isNaN(percentage) ? "0%" : percentage + "%";
};

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
  let data = {};
  // get total rubros report
  model.Balanza.findAll({
    attributes: [
      "rubro",
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["rubro"],
    where: { auditId: req.params.auditId, month: "DICIEMBRE" },
    order: [["rubro", "ASC"]]
  })
    .then(totalRubros => {
      // format values
      data.totalRubros = totalRubros.reduce((acc, cv) => {
        acc.push({
          rubro: cv.dataValues.rubro,
          total_saldoFinal_raw: cv.dataValues.total_saldoFinal,
          total_saldoFinal: formatNumber(cv.dataValues.total_saldoFinal)
        });
        return acc;
      }, []);
      // get report
      return model.Balanza.findAll({
        attributes: [
          "rubro",
          "cuentaContable",
          "cuentaDescripción",
          [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
        ],
        group: ["month", "rubro", "cuentaContable", "cuentaDescripción"],
        where: { auditId: req.params.auditId, month: "DICIEMBRE" },
        order: [
          ["rubro", "ASC"],
          ["cuentaContable", "ASC"]
        ]
      });
    })
    .then(report => {
      // format numbers for report
      data.report = report.reduce((acc, cv) => {
        acc.push({
          rubro: cv.dataValues.rubro,
          cuentaContable: cv.dataValues.cuentaContable,
          cuentaDescripción: cv.dataValues.cuentaDescripción,
          total_saldoFinal: formatNumber(cv.dataValues.total_saldoFinal),
          percentage: calculatePercentage({
            saldoFinal: cv.dataValues.total_saldoFinal,
            rubro: cv.dataValues.rubro,
            totalRubros: data.totalRubros
          })
        });
        return acc;
      }, []);
      // get destacadas
      data.destacadas = report
        .sort((a, b) =>
          Math.abs(a.dataValues.total_saldoFinal) >
          Math.abs(b.dataValues.total_saldoFinal)
            ? -1
            : Math.abs(b.dataValues.total_saldoFinal) >
              Math.abs(a.dataValues.total_saldoFinal)
            ? 1
            : 0
        )
        .slice(0, 10)
        .reduce((acc, cv) => {
          acc.push({
            rubro: cv.dataValues.rubro,
            cuentaContable: cv.dataValues.cuentaContable,
            cuentaDescripción: cv.dataValues.cuentaDescripción,
            total_saldoFinal: formatNumber(cv.dataValues.total_saldoFinal)
          });
          return acc;
        }, []);
      //
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(422).send({
        msg: "Ocurrió un error"
      });
    });
});

// balanzaReport_csdsc()
// matches with /api/balanza/report/csdsc/:clientId/:year
router.get("/report/csdsc/:clientId/:year", function(req, res) {
  let uniqueCuentas = [];
  // get unique cuentas
  model.Balanza.findAll({
    attributes: ["cuentaContable", "cuentaDescripción"],
    group: ["cuentaContable"],
    where: {
      clientId: req.params.clientId,
      year: { [Op.or]: [req.params.year, req.params.year - 1] },
      month: "DICIEMBRE"
    },
    order: [["cuentaContable", "ASC"]]
  })
    .then(cuentas => {
      uniqueCuentas = cuentas;
      // report
      return model.Balanza.findAll({
        attributes: [
          "cuentaContable",
          "year",
          [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
        ],
        group: ["cuentaContable", "year"],
        where: {
          clientId: req.params.clientId,
          year: { [Op.or]: [req.params.year, req.params.year - 1] },
          month: "DICIEMBRE"
        },
        order: [
          ["cuentaContable", "ASC"],
          ["year", "ASC"]
        ]
      });
    })
    .then(report => {
      // prepare report
      report = report.reduce((acc, cv) => {
        // get index
        let index = acc
          .map(i => i.cuentaContable)
          .indexOf(cv.dataValues.cuentaContable);
        // if cuenta doesn't exist
        if (index === -1) {
          acc.push({
            cuentaContable: cv.dataValues.cuentaContable,
            [cv.dataValues.year + "_totalSaldoFinal"]: cv.dataValues
              .total_saldoFinal
          });
        }
        // if it already exists in the acc array
        else {
          let temp = acc[index];
          acc[index] = {
            ...temp,
            [cv.dataValues.year + "_totalSaldoFinal"]: cv.dataValues
              .total_saldoFinal
          };
        }
        return acc;
      }, []);
      // get cuenta description
      report = report.reduce((acc, cv) => {
        let description = uniqueCuentas.filter(
          uc => uc.cuentaContable === cv.cuentaContable
        )[0].cuentaDescripción;
        let temp = { ...cv, cuentaDescripción: description };
        acc.push(temp);
        return acc;
      }, []);
      // sum values
      report = report.reduce((acc, cv) => {
        let variaciónImporte =
          cv[req.params.year + "_totalSaldoFinal"] -
          cv[req.params.year - 1 + "_totalSaldoFinal"];
        let variaciónPorcentaje =
          variaciónImporte === 0
            ? 0
            : (variaciónImporte /
                cv[req.params.year - 1 + "_totalSaldoFinal"]) *
              100;
        acc.push({ ...cv, variaciónImporte, variaciónPorcentaje });
        return acc;
      }, []);
      // get destacadas
      let destacadas = report
        .sort((a, b) =>
          Math.abs(a.variaciónImporte) > Math.abs(b.variaciónImporte)
            ? -1
            : Math.abs(b.variaciónImporte) > Math.abs(a.variaciónImporte)
            ? 1
            : 0
        )
        .slice(0, 10);
      // format numbers
      report = report.reduce((acc, cv) => {
        let temp = cv;
        temp[req.params.year - 1 + "_totalSaldoFinal"] = formatNumber(
          cv[req.params.year - 1 + "_totalSaldoFinal"]
        );
        temp[req.params.year + "_totalSaldoFinal"] = formatNumber(
          cv[req.params.year + "_totalSaldoFinal"]
        );
        temp.variaciónImporte = formatNumber(cv.variaciónImporte);
        temp.variaciónPorcentaje = formatPercentage(cv.variaciónPorcentaje);
        //
        acc.push(temp);
        //
        return acc;
      }, []);
      // send final report
      res.send({ report, destacadas });
    })
    .catch(err => {
      console.log(err);
      res.status(422).send({
        msg: "Ocurrió un error"
      });
    });
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
router.get("/report/amdm/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "rubro",
      "cuentaContable",
      "cuentaDescripción",
      "month",
      [sequelize.fn("sum", sequelize.col("cargos")), "total_cargos"],
      [sequelize.fn("sum", sequelize.col("abonos")), "total_abonos"]
    ],
    group: ["rubro", "cuentaContable", "cuentaDescripción", "month"],
    where: { auditId: req.params.auditId },
    order: [
      ["rubro", "ASC"],
      ["cuentaContable", "ASC"]
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// balanzaReport_sdi()
// matches with /api/balanza/report/sdi/:auditId
router.get("/report/sdi/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "rubro",
      "month",
      [
        sequelize.fn("sum", sequelize.col("saldoInicial")),
        "total_saldoInicial"
      ],
      [sequelize.fn("sum", sequelize.col("cargos")), "total_cargos"],
      [sequelize.fn("sum", sequelize.col("abonos")), "total_abonos"],
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["rubro", "month"],
    where: {
      auditId: req.params.auditId,
      rubro: { [Op.substring]: "INGRESOS" }
    },
    order: [["rubro", "ASC"]]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// balanzaReport_sdg()
// matches with /api/balanza/report/sdg/:auditId
router.get("/report/sdg/:auditId", function(req, res) {
  model.Balanza.findAll({
    attributes: [
      "rubro",
      "month",
      [
        sequelize.fn("sum", sequelize.col("saldoInicial")),
        "total_saldoInicial"
      ],
      [sequelize.fn("sum", sequelize.col("cargos")), "total_cargos"],
      [sequelize.fn("sum", sequelize.col("abonos")), "total_abonos"],
      [sequelize.fn("sum", sequelize.col("saldoFinal")), "total_saldoFinal"]
    ],
    group: ["rubro", "month"],
    where: {
      auditId: req.params.auditId,
      cuentaContable: { [Op.startsWith]: "5" }
    },
    order: [["rubro", "ASC"]]
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

module.exports = router;
