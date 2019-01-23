const router = require("express").Router();
const keychainController = require("../../controllers/keychainController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/users/"
router
  .route("/:id")
  .get(isAuthenticated, keychainController.findOneKey)
  .put(isAuthenticated, keychainController.editKey)
  .delete(isAuthenticated, keychainController.deleteKey)
  .post(isAuthenticated, keychainController.createKey)
  // .route("/:id")

// Find all for users
router
  .route("/")
  .get(isAuthenticated, keychainController.findAll)

  module.exports = router;