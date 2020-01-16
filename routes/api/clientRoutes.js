const router = require("express").Router();
const model = require("../../models");

// get all clients
// matches with /api/client/all
router.get("/all", function(req, res) {
  model.Client.findAll({
    order: ["name"]
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// add a new client to the db
// matches with /api/client/new
router.post("/new", function(req, res) {
  model.Client.create({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    rfc: req.body.rfc,
    address: req.body.address
  })
    .then(function(res) {
      res.json(res);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// update a client
// matches with /api/client/edit
router.put("/edit", function(req, res) {
  console.log("editando cliente:");
  console.log("=========");
  console.log(req.body);
  console.log("=========");
  model.Client.update(
    {
      name: req.body.name,
      abbreviation: req.body.abbreviation,
      rfc: req.body.rfc,
      address: req.body.address
    },
    {
      where: { clientId: req.body.clientId }
    }
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// get client info from a given clientId
// matches with /api/client/:id
router.get("/:clientId", function(req, res) {
  model.Client.findOne({
    where: { clientId: req.params.clientId }
  })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
