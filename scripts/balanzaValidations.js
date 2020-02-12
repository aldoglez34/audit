// ====================================
// VALIDATIONS
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

// ====================================
// EXPORTED
const balanzaValidations = {
  // this function will recieve an arr containing the balanza
  // and will return an array with the first item being true/false
  // and the second a description if there was an error
  validate: balanza => {
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
  }
};

module.exports = balanzaValidations;
