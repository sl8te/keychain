const router = require("express").Router();
const relationshipController = require("../../controllers/relationshipController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/relationships/"
router
    .route("/")
    // add a friend request
    .post(isAuthenticated, relationshipController.addFriendRequest)
    .get(isAuthenticated, relationshipController.findAllFriends)

// Matches with "/api/relationships/:id"
router
    .route("/:id")
    .put(isAuthenticated, relationshipController.acceptFriend)
    .delete(isAuthenticated, relationshipController.denyRequest)
    .get(relationshipController.checkFriendStatus)

router
    .route("/recieved/:id")
    .get(relationshipController.findAllRecievedRequests)

router
    .route("/sent/:id")
    .get(relationshipController.findAllSentRequests)

router
    .route("/userOne/:id")
    .delete(relationshipController.userOneDelete)

router
    .route("/userTwo/:id")
    .delete(relationshipController.userTwoDelete)
  module.exports = router;