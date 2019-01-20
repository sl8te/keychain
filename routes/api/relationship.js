const router = require("express").Router();
const relationshipController = require("../../controllers/relationshipController");

// Matches with "/api/relationships/"
router
    .route("/")
    // add a friend request
    .post(/*isAuthenticated,*/relationshipController.addFriendRequest)
    .get(/*isAuthenticated,*/relationshipController.findAllFriends)

// Matches with "/api/relationships/:id"
router
    .route("/:id")
    .put(/*isAuthenticated,*/relationshipController.acceptFriend)
    .delete(/*isAuthenticated,*/relationshipController.denyRequest)

router
    .route("/recieved/:id")
    .get(relationshipController.findAllRecievedRequests)

router
    .route("/sent/:id")
    .get(relationshipController.findAllSentRequests)

router
    .route("/requests/:id")
    .get(/*isAuthenticated,*/relationshipController.checkFriendStatus)
    
  module.exports = router;