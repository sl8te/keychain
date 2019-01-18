const router = require("express").Router();
const passport = require("../../config/passport");
const userSessionController = require("../../controllers/userSessionController");

router
    .route("/")
    .post(passport.authenticate("local"), function(req, res) {
        console.log(req.user);
        res.send("You're logged in!");
    })

module.exports = router;