const router = require("express").Router();
const model = require("../models");

// get user info from a given uid
// matches with /api/user/:uid
router.get("/:uid", function(req, res) {
  model.User.findOne({
    where: {
      firebase_uid: req.params.uid
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
