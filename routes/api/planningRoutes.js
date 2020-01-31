const router = require("express").Router();
const model = require("../../models");
const Sequelize = require("sequelize");

// ===============================================
// WORKPLAN

// fetchWorkplan()
// matches with /api/planning/workplan/:auditId
router.get("/workplan/:auditId", function(req, res) {
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
// matches with /api/planning/workplan/add
router.post("/workplan/add", function(req, res) {
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
// matches with /api/planning/workplan/delete/:data
router.delete("/workplan/delete/:data", function(req, res) {
  let auditId = req.params.data.substr(0, req.params.data.indexOf("-"));
  let workplanId = req.params.data.substr(req.params.data.indexOf("-") + 1);
  model.WorkplanAnswer.destroy({
    where: {
      auditId: auditId,
      workplanId: workplanId
    }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// ===============================================
// SURVEYS

// fetchSurveyTitles()
// matches with /api/planning/survey/titles
router.get("/survey/titles", function(req, res) {
  model.Survey.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("title")), "title"]],
    order: [["title", "ASC"]]
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// fetchSurvey()
// matches with /api/planning/survey/:auditId/:surveyTitle
router.get("/survey/:auditId/:surveyTitle", function(req, res) {
  model.Survey.findAll({
    attributes: ["surveyId", "question"],
    where: { title: req.params.surveyTitle },
    order: [["surveyId", "ASC"]],
    include: [
      {
        model: model.SurveyAnswer,
        attributes: ["auditId", "surveyId", "answer"],
        where: { auditId: req.params.auditId },
        required: false // <- this will force a LEFT JOIN
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

// postNewAnswer()
// matches with /api/planning/survey/post
router.post("/survey/post", function(req, res) {
  const [auditId, answer] = req.body;
  model.SurveyAnswer.create({
    auditId: auditId,
    surveyId: answer.surveyId,
    answer: answer.answer
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// updateAnswer()
// matches with /api/planning/survey/update
router.put("/survey/update", function(req, res) {
  const [auditId, answer] = req.body;
  model.SurveyAnswer.update(
    { answer: answer.answer },
    { where: { auditId: auditId, surveyId: answer.surveyId } }
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// deleteAnswer()
// matches with /api/planning/survey/delete/:data
router.delete("/survey/delete/:data", function(req, res) {
  let auditId = req.params.data.substr(0, req.params.data.indexOf("-"));
  let surveyId = req.params.data.substr(req.params.data.indexOf("-") + 1);

  model.SurveyAnswer.destroy({
    where: {
      auditId: auditId,
      surveyId: surveyId
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
