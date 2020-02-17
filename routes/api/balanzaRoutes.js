const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");
const validateBalanza = require("../middleware/validateBalanza");
const balanzaReports = require("../scripts/balanzaReports");

// uploadBalanza()
// matches with /api/balanza/upload
router.post("/upload", validateBalanza(), function(req, res, next) {});

// fetchBalanza()
// matches with /api/balanza/:auditId
router.get("/:auditId", function(req, res) {
  model.Balanza.findAll({ limit: 50, where: { auditId: req.params.auditId } })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
