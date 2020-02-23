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
      rubro: row[2].trim(),
      cuentaDescripción: row[3].trim(),
      saldoInicial: parseFloat(parseFloat(row[4]).toFixed(2)),
      cargos: parseFloat(parseFloat(row[5]).toFixed(2)),
      abonos: parseFloat(parseFloat(row[6]).toFixed(2)),
      saldoFinal: parseFloat(parseFloat(row[7]).toFixed(2))
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
    let isCandATheSame = diff_CyA === 0 ? true : false;

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

module.exports = ({ balanza, auditId }) => {
  // generate monthly report with differences
  const report = generateMonthlyReport({ balanza, auditId });

  // evaluate report
  let monthsWithProblems = report.reduce((acc, cv) => {
    if (!cv.isSIZero || !cv.isSFZero || !cv.isCandATheSame) acc.push(cv.month);
    return acc;
  }, []);

  // if monthsWithProblems is NOT empty, return false, else return true
  // as a second item return the array spreaded
  return [
    monthsWithProblems.length ? false : true,
    monthsWithProblems.toString()
  ];
};
