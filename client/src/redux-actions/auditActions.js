export const openAudit = data => {
  return {
    type: "audit/open",
    data
  };
};

export const closeAudit = () => {
  return {
    type: "audit/close"
  };
};

export const setBackBttn = data => {
  return {
    type: "audit/setBackBttn",
    data
  };
};
