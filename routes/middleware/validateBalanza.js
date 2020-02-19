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
  return [result, result ? "" : `El mes "${value}" no es válido`];
};

const validateCuentaContable = value => {
  // value must have length of 12
  let result = value.length === 12 ? true : false;
  return [
    result,
    result ? "" : `La cuenta contable "${value}" no tiene 12 digitos`
  ];
};

const validateCuentaDescripción = value => {
  // value has to be a string
  let result = typeof value === "string" ? true : false;
  return [result, result ? "" : `La descripción "${value}" no es válida`];
};

const validateNumber = value => {
  // CHECK IF THE NUMBER HAS INVALID CHARS SUCH AS .
  // convert value to number and check if it returns NaN, if so it means it wasn't a number
  // if value was a string, after converting it will return NaN (falsy)
  let result = !isNaN(parseFloat(parseFloat(value).toFixed(2))) ? true : false;
  return [result, result ? "" : `El número "${value}" no es válido`];
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
const generateMonthlyReport = ({ balanza, auditId }) => {
  // first generate an array of objects with each string in the balanza array
  const arrOfObjs = balanza.reduce((acc, cv) => {
    // split current value into an array (separated by commas)
    let row = cv.split(",");
    // concat values as an object into the acc array
    return acc.concat({
      auditId,
      month: row[0].toUpperCase(),
      cuentaContable: row[1],
      cuentaDescripción: row[2].trim(),
      saldoInicial: parseFloat(parseFloat(row[3]).toFixed(2)),
      cargos: parseFloat(parseFloat(row[4]).toFixed(2)),
      abonos: parseFloat(parseFloat(row[5]).toFixed(2)),
      saldoFinal: parseFloat(parseFloat(row[6]).toFixed(2))
    });
  }, []);

  // then generate a monthly report based on previous array of objs
  const monthlyReport = arrOfObjs.reduce((acc, cv) => {
    // check if the month of cv is already in the acc
    if (acc.filter(i => i.month === cv.month).length ? true : false) {
      // if so, sum the values
      let index = acc.map(i => i.month).indexOf(cv.month);
      let temp = acc[index];
      acc[index] = {
        ...temp,
        total_si: temp.total_si + cv.saldoInicial,
        total_c: temp.total_c + cv.cargos,
        total_a: temp.total_a + cv.abonos,
        total_sf: temp.total_sf + cv.saldoFinal
      };
    } else {
      // if not then push the object with only the values needed
      acc.push({
        month: cv.month,
        total_si: cv.saldoInicial,
        total_c: cv.cargos,
        total_a: cv.abonos,
        total_sf: cv.saldoFinal
      });
    }
    return acc;
  }, []);

  // finally set differences
  const monthlyReportWithDiff = monthlyReport.reduce((acc, obj) => {
    let total_si = Math.round(
      Number(
        parseFloat(obj.total_si)
          .toLocaleString()
          .replace(/,/g, "")
      )
    );
    let total_c = Math.round(
      Number(
        parseFloat(obj.total_c)
          .toLocaleString()
          .replace(/,/g, "")
      )
    );
    let total_a = Math.round(
      Number(
        parseFloat(obj.total_a)
          .toLocaleString()
          .replace(/,/g, "")
      )
    );
    let total_sf = Math.round(
      Number(
        parseFloat(obj.total_sf)
          .toLocaleString()
          .replace(/,/g, "")
      )
    );

    let isSIZero = total_si === 0 ? true : false;
    let isSFZero = total_sf === 0 ? true : false;
    let diff_CyA = total_c - total_a;
    let isCandATheSame = total_sf === 0 ? true : false;

    let month = {
      month: obj.month,
      total_si,
      total_c,
      total_a,
      total_sf,
      isSIZero,
      isSFZero,
      isCandATheSame,
      diff_CyA
    };
    acc.push(month);
    return acc;
  }, []);

  // return the whole thing
  return monthlyReportWithDiff;
};

const initReportValidation = ({ balanza, auditId }) => {
  // generate monthly report with differences
  const report = generateMonthlyReport({ balanza, auditId });

  // evaluate report
  let monthsWithProblems = report.reduce((acc, cv) => {
    if (!cv.isSIZero || !cv.isSFZero || !cv.isCandATheSame) acc.push(cv.month);
    return acc;
  }, []);

  // if monthsWithProblems is NOT empty, return false, else return true
  // as a second item return the array spreaded
  return [monthsWithProblems.length ? false : true, ...monthsWithProblems];
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
        msg:
          "Ocurrió un error con la validación de tu archivo:\n" + syntaxErrorMsg
      });
    } else {
      // initialize REPORT validation
      // the first element will be true/false
      // and the second will contain a text description if there was an error
      const auditId = req.body.auditId;
      const [isReportValid, reportErrorMsg] = initReportValidation({
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
