const router = require("express").Router();
const model = require("../../models");

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
      // converting values if necessary
      let month = row[0].replace('"', "").trim();
      let cuentaContable = row[1].replace('"', "").trim();
      let cuentaDescripción = row[2].replace('"', "").trim();
      let saldoInicial = parseFloat(row[3]);
      let cargos = parseFloat(row[4]);
      let abonos = parseFloat(row[5]);
      let saldoFinal = parseFloat(row[6]);
      // console.log({
      //   auditId: req.body.auditId,
      //   month,
      //   cuentaContable,
      //   cuentaDescripción,
      //   saldoInicial,
      //   cargos,
      //   abonos,
      //   saldoFinal
      // });
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
          if (index === array.length - 1) resolve();
        })
        .catch(err => console.log(err));
    });
  });
  insertRows
    .then(() => {
      model.Audit.update(
        { hasBalanza: true },
        { where: { auditId: req.body.auditId } }
      )
        .then(res => res.json(res))
        .catch(err => res.json(err));
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
