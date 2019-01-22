const router = require("express").Router();
const passport = require("../../config/passport");

router
    .route("/")
    .get(function(req, res) {
        req.logout();
        res.send("you've logged out");
    })

module.exports = router;