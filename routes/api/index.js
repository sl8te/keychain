const router = require("express").Router();
// const bookRoutes = require("./books");
const userRoutes = require("./user");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
const relationshipRoutes = require("./relationship");
const keychainRoutes = require("./keychain");

// Book routes
router.use("/books", bookRoutes);
// User routes
router.use("/users", userRoutes);
// Login route
router.use("/login", loginRoute);
// Logout route
router.use("/logout", logoutRoute);
// relationship routes
router.use("/relationships", relationshipRoutes);
// keychain routes
router.use("/keychain", keychainRoutes);

module.exports = router;
