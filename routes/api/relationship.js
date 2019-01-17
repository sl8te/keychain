const router = require("express").Router();
const relationshipController = require("../../controllers/relationshipController");

// Matches with "/api/relationships/"
router
    .route("/")
    // add a friend request
    .post(relationshipController.addFriendRequest)
    .get(relationshipController.findAllFriends)

// Matches with "/api/relationships/:id"
router
    .route("/:id")
    .get(relationshipController.findAllFriendRequests)
    .put(relationshipController.acceptFriend)
    .delete(relationshipController.denyRequest)

router
    .route("/requests/:id")
    .get(relationshipController.checkFriendStatus)
    
  module.exports = router;