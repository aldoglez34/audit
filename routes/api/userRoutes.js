const router = require("express").Router();
const model = require("../../models");

// fetchUserInfo()
// matches with /api/user/:uid
router.get("/:uid", function(req, res) {
  model.User.findOne({
    attributes: [
      "userId",
      "firebase_uid",
      "role",
      "name",
      "firstSurname",
      "email"
    ],
    where: {
      firebase_uid: req.params.uid
    }
  })
    .then(data => res.json(data))
    .catch(err => res.send(err));
});

module.exports = router;
