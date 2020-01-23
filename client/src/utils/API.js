import axios from "axios";

export default {
  // =================================================================
  // USERS

  fetchUserInfo: function(uid) {
    return axios.get("/api/user/" + uid);
  },

  // =================================================================
  // AUDITS

  fetchAudits: function() {
    return axios.get("/api/audit/all");
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
  // SURVEYS

  getAnswersFromCCI: function(auditId) {
    return axios.get("/api/survey/cci/" + auditId);
  },

  saveAnswersToCCI: function(answers) {
    return axios.put("/api/survey/cci", answers);
  },

  getAnswersFromCEFS: function(auditId) {
    return axios.get("/api/survey/cefs/" + auditId);
  },

  saveAnswersToCEFS: function(answers) {
    return axios.put("/api/survey/cefs", answers);
  },

  // =================================================================
  // BALANZAS

  uploadBalanza: function(data) {
    return axios.post("/api/balanza/upload", data);
  },

  fetchBalanza: function(auditId) {
    return axios.get("/api/balanza/" + auditId);
  }
};
