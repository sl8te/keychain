const router = require("express").Router();
const userController = require("../../controllers/userController");
// const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/users/"
router
  .route("/:id")
  .get(userController.findOneUser)
  // .route("/:id")
  // .get(isAuthenticated, userController.findOneUser)

// Find all for users
router
  .route("/")
  .get(userController.findAll)
  .post(userController.createUser)

  module.exports = router;