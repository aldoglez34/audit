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
  return [result, result ? null : `El mes "${value}" no es válido`];
};

const validateCuentaContable = value => {
  // value must have length of 12
  let result = value.length === 12 || value.length === 14 ? true : false;
  return [
    result,
    result ? null : `La cuenta contable "${value}" no tiene 12 o 14 digitos`
  ];
};

const validateCuentaDescripción = value => {
  // value has to be a string
  let result = typeof value === "string" ? true : false;
  return [result, result ? null : `La descripción "${value}" no es válida`];
};

const validateRubro = value => {
  // value has to be a string
  let result = typeof value === "string" ? true : false;
  return [result, result ? null : `El rubro "${value}" no es válido`];
};

const validateNumber = value => {
  // check if the value is a valid number
  // by converting it and then checking if is not a number
  let result = !isNaN(Number(value));
  return [result, result ? null : `El número "${value}" no es válido`];
};

module.exports = balanza => {
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
    // validate rubro
    [isValid, text] = validateRubro(row[2]);
    if (!isValid) return [isValid, text];
    // validate cuenta descripción
    [isValid, text] = validateCuentaDescripción(row[3]);
    if (!isValid) return [isValid, text];
    // validate saldo inicial
    [isValid, text] = validateNumber(row[4]);
    if (!isValid) return [isValid, text];
    // validate cargos
    [isValid, text] = validateNumber(row[5]);
    if (!isValid) return [isValid, text];
    // validate abonos
    [isValid, text] = validateNumber(row[6]);
    if (!isValid) return [isValid, text];
    // validate saldo final
    [isValid, text] = validateNumber(row[7]);
    if (!isValid) return [isValid, text];
  }
  return [isValid, text];
};
