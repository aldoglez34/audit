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
      // create the record in the db
      model.Balanza.create({
        auditId: req.body.auditId,
        month: row[0],
        rubro: row[1],
        clasifEdosFinancieros: row[2],
        cuentaMayor: row[3],
        subCuenta: row[4],
        cuentaContable: row[5],
        saldoInicial: row[6],
        cargos: row[7],
        abonos: row[8],
        saldoFinal: row[9]
      }).catch(function(err) {
        console.log(err);
      });
      if (index === array.length - 1) resolve();
    });
  });
  insertRows.then(() => {
    model.Audit.update(
      { hasBalanza: true },
      { where: { auditId: req.body.auditId } }
    )
      .then(res => res.json(res))
      .catch(err => res.json(err));
  });
});

// fetchBalanza()
// matches with /api/balanza/:auditId
router.get("/:auditId", function(req, res) {
  model.Balanza.findAll({
    where: { auditId: req.params.auditId }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
