const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users/"
router
  .route("/:id")
  .get(userController.findOneUser)

// Find all for users
router
  .route("/")
  .get(userController.findAll)
  .post(userController.createUser)

  module.exports = router;