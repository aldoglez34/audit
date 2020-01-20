export const setAuditInfo = data => {
  return {
    type: "audit/setAuditInfo",
    data
  };
};

export const deleteAuditInfo = () => {
  return {
    type: "audit/deleteAuditInfo"
  };
};

export const addBalanza = () => {
  return {
    type: "audit/addBalanza"
  };
};
