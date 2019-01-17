const router = require("express").Router();
const passport = require("../../config/passport");

router
    .route("/")
    .post(passport.authenticate("local"), function(req, res) {
        res.send("You're logged in!");
    })

module.exports = router;