const router = require("express").Router();
const keychainController = require("../../controllers/keychainController");
// const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/users/"
router
  .route("/:id")
  .get(/*isAuthenticated,*/keychainController.findOneKey)
  .put(/*isAuthenticated,*/keychainController.editKey)
  .delete(/*isAuthenticated,*/keychainController.deleteKey)
  // .route("/:id")
  // .get(isAuthenticated, userController.findOneUser)

// Find all for users
router
  .route("/")
  .get(/*isAuthenticated,*/keychainController.findAll)
  .post(/*isAuthenticated,*/keychainController.createKey)

  module.exports = router;