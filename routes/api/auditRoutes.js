const router = require("express").Router();
const model = require("../../models");

// postVisit()
// matches with /api/audit/visit
router.post("/visit", function(req, res) {
  model.AuditVisit.create({
    auditId: req.body.auditId,
    userId: req.body.userId,
    date: Date.now()
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

// fetchAudits()
// matches with /api/audit/all/:userId
router.get("/all/:userId", function(req, res) {
  model.Audit.findAll({
    order: [["name", "asc"]],
    include: [
      { model: model.Client },
      {
        model: model.AuditVisit,
        attributes: ["date"],
        where: { userId: req.params.userId },
        order: [["date", "DESC"]],
        limit: 1,
        required: false // <- this will force a LEFT JOIN
      }
    ]
  })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// fetchUniqueClients()
// matches with /api/audit/uniqueClients
router.get("/uniqueClients", function(req, res) {
  model.Audit.findAll({
    attributes: ["name"],
    order: [["name", "ASC"]]
  })
    .then(function(data) {
      // trim string to remove year
      let noYear = [];
      data.forEach(i => {
        let s = i.dataValues.name;
        noYear.push(s.substr(0, s.indexOf(" ")));
      });

      // FUNCTION to erase duplicates
      const unique = arr => Array.from(new Set(arr));

      // send to front an array with UNIQUE values
      res.json(unique(noYear));
    })
    .catch(function(err) {
      res.send(err);
    });
});

// fetchOneAudit()
// matches with /api/audit/:id
router.get("/:auditId", function(req, res) {
  model.Audit.findOne({
    where: { auditId: req.params.auditId }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// saveNewAudit()
// also create blank surveys from that audit (?) <- not sure about this tho
// matches with /api/audits/new
router.post("/new", function(req, res) {
  let clientId = req.body.clientIdAndAbbr.substr(
    0,
    req.body.clientIdAndAbbr.indexOf("#")
  );
  let abbreviation = req.body.clientIdAndAbbr.substr(
    req.body.clientIdAndAbbr.indexOf("#") + 1
  );

  model.Audit.create({
    clientId,
    name: abbreviation + " " + req.body.year,
    year: req.body.year,
    description: req.body.description
  })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
