const balanzaReports = data => {
  // elaborate report
  return data.reduce((acc, obj) => {
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
};

module.exports = balanzaReports;
