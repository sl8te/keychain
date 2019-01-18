const router = require("express").Router();
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router
    .route("/")
    .post(passport.authenticate("local"), function(req, res) {
      console.log(req.user);
      res.json(req.user);  
    })

module.exports = router;