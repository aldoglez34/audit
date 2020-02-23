const syntaxValidation = require("./syntax/syntaxValidation");
const validateReports = require("./reports/validateReports");

const validateBalanza = () => {
  return (req, res, next) => {
    // split file into array, \r\n marks the end of a row
    const balanza = req.body.file.split("\r\n");

    // if hasHeaders is true, delete the first row
    if (req.body.hasHeaders) balanza.shift();

    // if last row is empty, delete it
    if (!balanza[balanza.length - 1]) balanza.pop();

    // initialize SYNTAX validation
    // the first element will be true/false
    // and the second will contain a text description if there was an error
    const [isSyntaxValid, syntaxErrorMsg] = syntaxValidation(balanza);

    // if it's not valid, send the msg error to the front end
    if (!isSyntaxValid) {
      res.status(422).send({
        msg:
          "Ocurrió un error con la validación de tu archivo:\n" + syntaxErrorMsg
      });
    } else {
      // initialize REPORT validation
      // the first element will be true/false
      // and the second will contain a text description if there was an error
      const auditId = req.body.auditId;
      const [isReportValid, reportErrorMsg] = validateReports({
        balanza,
        auditId
      });

      if (!isReportValid) {
        res.status(422).send({
          msg:
            "Ocurrió un error con los totales de tu archivo en los siguientes meses:\n" +
            reportErrorMsg
        });
      } else {
        next();
      }
    }
  };
};

module.exports = validateBalanza;
