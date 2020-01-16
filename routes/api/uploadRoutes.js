
const router = require("express").Router();
const csv = require("csv");
const fs = require("fs");
const model = require("../../models");
const csvParse = require("csv-parse")
const through2 = require("through2")
const Readable = require("stream").Readable;

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// upload a balanza to the db
// matches with /api/upload/balanza
router.post("/balanza", upload.single("csvFile"), function (req, res) {

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;
  const auditId = req.body.auditId;

  console.log("\n\n\n\n\n");

  // first, write the file coming from the frontend
  fs.writeFile("uploads/" + fileName, fileBuffer, function (err) {
    if (err) throw err;
    console.log("writing file in uploads...");
  });

  // then read the file
  fs.createReadStream("uploads/" + fileName)
    .pipe(csvParse({ auto_parse: true }))
    .pipe(through2.obj(function (chunk, encoding, callback) {
      this.push({
        mes: chunk[0],
        rubro: chunk[1],
        clasificación: chunk[2],
        cuentaMayor: chunk[3],
        subCuenta: chunk[4],
        cuentaContable: chunk[5],
        saldoInicial: chunk[6],
        cargos: chunk[7],
        abonos: chunk[8],
        saldoFinal: chunk[9]
      })
      callback()
    }))
    .on("data", function (record) {

      // console.log("\n\n");
      // console.log(JSON.stringify(record, null, 4))
      // console.log(auditId);
      // console.log(record.mes);
      // console.log(record.rubro);
      // console.log(record.clasificación);
      // console.log(record.cuentaMayor);
      // console.log(record.subCuenta);
      // console.log(record.cuentaContable);
      // console.log(record.saldoInicial);
      // console.log(record.cargos);
      // console.log(record.abonos);
      // console.log(record.saldoFinal);

      model.Balanza.create({
        auditId: auditId,
        mes: record.mes,
        rubro: record.rubro,
        clasificación: record.clasificación,
        cuentaMayor: record.cuentaMayor,
        subCuenta: record.subCuenta,
        cuentaContable: record.cuentaContable,
        saldoInicial: record.saldoInicial,
        cargos: record.cargos,
        abonos: record.abonos,
        saldoFinal: record.saldoFinal
      })
        .then(function (res) {
          // res.json(res);
        })
        .catch(function (err) {
          // res.send(err);
        });

    });

  // res.send("\n\n\nprocess ended\n\n\n");

  // after that, delete it
  fs.unlink("uploads/" + fileName, function (err) {
    if (err) throw err;
    console.log("now deleting file...");
    res.send("process finished");
  });

});

module.exports = router;
