const router = require("express").Router();
const userController = require("../../controllers/userController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/users/"
router
  .route("/:id")
  // .get(/*isAuthenticated,*/userController.findOneUser)
  .delete(/*isAuthenticated,*/userController.deleteUser)
  // .route("/:id")
  // .get(isAuthenticated, userController.findOneUser)

// Find all for users
router
  .route("/")
  .get(/*isAuthenticated,*/userController.findAll)
  .put(/*isAuthenticated,*/userController.editUser)
  .post(userController.createUser)

router
  .route("/me")
    .get(isAuthenticated, function(req, res) {
      res.json(req.user);
    })

  module.exports = router;