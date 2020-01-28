const router = require("express").Router();
const model = require("../../models");

// fetchWorkplan()
// matches with /api/workplan/:auditId
router.get("/:auditId", function(req, res) {
  model.Workplan.findAll({
    attributes: ["workplanId", "text"],
    include: [
      {
        model: model.WorkplanAnswer,
        attributes: ["workplanAnswerId", "auditId", "workplanId", "isDone"],
        where: { auditId: req.params.auditId },
        required: false
      }
    ]
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// addWorkplanAnswer()
// matches with /api/workplan/add
router.post("/add", function(req, res) {
  model.WorkplanAnswer.create({
    auditId: req.body.auditId,
    workplanId: req.body.workplanId,
    isDone: true
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// deleteWorkplanAnswer()
// matches with /api/workplan/delete
router.delete("/delete", function(req, res) {
  model.WorkplanAnswer.destroy({
    where: {
      auditId: req.body.auditId,
      workplanId: req.body.workplanId
    }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;