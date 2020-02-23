const auditReducers = (state = {}, action) => {
  switch (action.type) {
    case "audit/setAuditInfo":
      return {
        isOpen: true,
        auditId: action.data.auditId,
        name: action.data.name,
        year: action.data.year,
        hasNómina: action.data.hasNómina,
        hasBalanza: action.data.hasBalanza
      };
    case "audit/deleteAuditInfo":
      return {};
    case "audit/addBalanza":
      return {
        ...state,
        hasBalanza: true
      };
    default:
      return state;
  }
};

export default auditReducers;
