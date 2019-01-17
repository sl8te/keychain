const router = require("express").Router();

router
    .route("/")
    .get(function(req, res) {
        req.logOut();
        res.send("you've logged out");
    })

module.exports = router;