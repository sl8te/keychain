const router = require("express").Router();
const keychainController = require("../../controllers/keychainController");
// const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/users/"
router
  .route("/:id")
  .get(keychainController.findOneKey)
  .put(keychainController.editKey)
  .delete(keychainController.deleteKey)
  .post(keychainController.createKey)
  // .route("/:id")
  // .get(isAuthenticated, userController.findOneUser)

// Find all for users
router
  .route("/")
  .get(keychainController.findAll)

  module.exports = router;