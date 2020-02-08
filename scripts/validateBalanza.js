export default {
  // VALIDATIONS
  validateMonth: value => {
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
    return months.includes(value);
  },

  validateCuentaContable: value => {
    return value.length === 12 ? true : false;
  },

  validateCuentaDescripción: value => {
    if (typeof value === "string") return true;
    return false;
  },

  validateNumber: value => {
    // HERE CHECK IF THE NUMBER HAS INVALID CHARS SUCH AS .
    // convert the value to a number
    let number = parseFloat(parseFloat(value).toFixed(2));
    // if value was a string, after converting it will return NaN (falsy)
    return !isNaN(number) ? true : false;
  },

  validateFile: value => {
    console.log("@ validation - starting validating");
    let isArrOk = true;
    for (let i = 0; i < arr.length; i++) {
      // split the row in an array
      let row = arr[i].split(",");
      // validate values
      if (
        !validateMonth(row[0]) ||
        !validateCuentaContable(row[1]) ||
        !validateCuentaDescripción(row[2]) ||
        !validateNumber(row[3]) ||
        !validateNumber(row[4]) ||
        !validateNumber(row[5]) ||
        !validateNumber(row[6])
      ) {
        isArrOk = false;
        break;
      }
      return isArrOk;
    }
  },

  // FORMATS
  formatStringValue: value => {
    if (typeof value !== "string") return "???";
    return value.replace('"', "").trim();
  },

  formatFloatValue: value => {
    if (typeof value === "string") {
      value = parseFloat(
        parseFloat(value.replace(/,/g, "").replace('"', "")).toFixed(2)
      );
    } else {
      value = parseFloat(parseFloat(value).toFixed(2));
    }
    return value;
  }
};
