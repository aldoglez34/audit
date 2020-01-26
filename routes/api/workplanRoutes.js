const router = require("express").Router();
const model = require("../../models");

// fetchWorkplan()
// matches with /api/workplan/all
router.get("/all", function(req, res) {
  model.Workplan.findAll({})
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
