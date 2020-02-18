// =================
// syntax validations
const validateMonth = value => {
  // value must be one of the twelve months in spanish
  const months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ];
  let result = months.includes(value.toUpperCase());
  return [result, result ? "" : `"${value}" no es un mes válido`];
};

const validateCuentaContable = value => {
  // value must have length of 12
  let result = value.length === 12 ? true : false;
  return [result, result ? "" : `"${value}" no tiene 12 digitos`];
};

const validateCuentaDescripción = value => {
  // value has to be a string
  let result = typeof value === "string" ? true : false;
  return [result, result ? "" : `"${value}" no es una texto válido`];
};

const validateNumber = value => {
  // CHECK IF THE NUMBER HAS INVALID CHARS SUCH AS .
  // convert value to number and check if it returns NaN, if so it means it wasn't a number
  // if value was a string, after converting it will return NaN (falsy)
  let result = !isNaN(parseFloat(parseFloat(value).toFixed(2))) ? true : false;
  return [result, result ? "" : `"${value}" no es un número válido`];
};

const initSyntaxValidation = balanza => {
  // this function will recieve an arr containing the balanza
  // and will return an array with the first item being true/false
  // and the second a description if there was an error
  let isValid = true;
  let text = "";
  // iterate balanza
  for (let i = 0; i < balanza.length; i++) {
    // split row into an array
    let row = balanza[i].split(",");
    // validate month
    [isValid, text] = validateMonth(row[0]);
    if (!isValid) return [isValid, text];
    // validate cuenta contable
    [isValid, text] = validateCuentaContable(row[1]);
    if (!isValid) return [isValid, text];
    // validate cuenta descripción
    [isValid, text] = validateCuentaDescripción(row[2]);
    if (!isValid) return [isValid, text];
    // validate saldo inicial
    [isValid, text] = validateNumber(row[3]);
    if (!isValid) return [isValid, text];
    // validate cargos
    [isValid, text] = validateNumber(row[4]);
    if (!isValid) return [isValid, text];
    // validate abonos
    [isValid, text] = validateNumber(row[5]);
    if (!isValid) return [isValid, text];
    // validate saldo final
    [isValid, text] = validateNumber(row[6]);
    if (!isValid) return [isValid, text];
  }
  return [isValid, text];
};

// =================
// report validation
const generateArrOfObjs = balanza => {
  return balanza.reduce((acc, cv) => {
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
};

const generateMonthlyReport = balanzaArrOfObjs => {
  return balanzaArrOfObjs.reduce((acc, cv) => {
    // if the month of the current value already exists in the accumulator
    if (acc.filter(i => i.month === cv.month).length ? true : false) {
      // get the index of the month and sum the cv to the object from that index
      let index = balanzaArrOfObjs.map(i => i.month).indexOf(cv.month);
      let temp = acc[index];
      acc[index] = {
        ...temp,
        saldoInicial: temp.saldoInicial + cv.saldoInicial,
        cargos: temp.cargos + cv.cargos,
        abonos: temp.abonos + cv.abonos,
        saldoFinal: temp.saldoFinal + cv.saldoFinal
      };
    } else {
      // if not then push the object with only the values needed
      acc.push({
        month: cv.month,
        saldoInicial: cv.saldoInicial,
        cargos: cv.cargos,
        abonos: cv.abonos,
        saldoFinal: cv.saldoFinal
      });
    }
    return acc;
  }, []);
};

const initReportValidation = balanza => {
  // first generate an array of objects
  const balanzaArrOfObjs = generateArrOfObjs(balanza);

  // then generate a monthly report
  const monthlyReport = generateMonthlyReport(balanzaArrOfObjs);

  console.log(monthlyReport);

  // evaluate report
};

// ====================================
// middleware exported
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
    const [isSyntaxValid, syntaxErrorMsg] = initSyntaxValidation(balanza);

    // if it's not valid, send the msg error to the front end
    if (!isSyntaxValid) {
      res.status(422).send({
        error:
          "Ocurrió un error con la validación de tu archivo\n" + syntaxErrorMsg
      });
    }
    // if it's valid carry on
    else {
      // initialize REPORT validation
      // the first element will be true/false
      // and the second will contain a text description if there was an error
      const [isReportValid, reportErrorMsg] = initReportValidation(balanza);

      if (!isReportValid) {
        res.status(422).send({
          error:
            "Ocurrió un error con el reporte mensual de tu archivo\n" +
            reportErrorMsg
        });
      } else {
        next();
      }
    }
  };
};

module.exports = validateBalanza;
