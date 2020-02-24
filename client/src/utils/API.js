import axios from "axios";

export default {
  // =================================================================
  // USERS

  fetchUserInfo: function(uid) {
    return axios.get("/api/user/" + uid);
  },

  // =================================================================
  // AUDITS

  postVisit: function(data) {
    return axios.post("/api/audit/visit", data);
  },

  fetchAudits: function(userId) {
    return axios.get("/api/audit/all/" + userId);
  },

  fetchUniqueClients: function() {
    return axios.get("/api/audit/uniqueClients");
  },

  fetchOneAudit: function(auditId) {
    return axios.get("/api/audit/" + auditId);
  },

  saveNewAudit: function(auditData) {
    return axios.post("/api/audit/new", auditData);
  },

  // =================================================================
  // CLIENTS

  fetchClients: function() {
    return axios.get("/api/client/all");
  },

  saveNewClient: function(clientData) {
    return axios.post("/api/client/new", clientData);
  },

  editClient: function(clientInfo) {
    return axios.put("/api/client/edit", clientInfo);
  },

  fetchOneClient: function(id) {
    return axios.get("/api/client/" + id);
  },

  // =================================================================
  // PLANNING

  // workplan

  fetchWorkplan: function(auditId) {
    return axios.get("/api/planning/workplan/" + auditId);
  },

  addWorkplanAnswer: function(data) {
    return axios.post("/api/planning/workplan/add", data);
  },

  deleteWorkplanAnswer: function(data) {
    return axios.delete("/api/planning/workplan/delete/" + data);
  },

  // surveys

  fetchSurveyTitles: function() {
    return axios.get("/api/planning/survey/titles");
  },

  fetchSurvey: function({ auditId, surveyTitle }) {
    return axios.get("/api/planning/survey/" + auditId + "/" + surveyTitle);
  },

  postNewAnswer: function(answer) {
    return axios.post("/api/planning/survey/post", answer);
  },

  updateAnswer: function(answer) {
    return axios.put("/api/planning/survey/update", answer);
  },

  deleteAnswer: function(answer) {
    return axios.delete("/api/planning/survey/delete/" + answer);
  },

  // =================================================================
  // BALANZAS

  uploadBalanza: function(data) {
    return axios.post("/api/balanza/upload", data);
  },

  fetchBalanza: function(auditId) {
    return axios.get("/api/balanza/" + auditId);
  },

  balanzaReport_ads: auditId =>
    axios.get("/api/balanza/report/amdg/topCuentas/" + auditId),

  report_Amdg_topCuentas: function(auditId) {
    return axios.get("/api/balanza/report/amdg/topCuentas/" + auditId);
  },

  report_Amdg_cuenta: function({ auditId, cuentaContable }) {
    return axios.get(
      "/api/balanza/report/amdg/cuenta/" + auditId + "/" + cuentaContable
    );
  }
};
