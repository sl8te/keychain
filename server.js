const express = require("express");
const env = require("dotenv").config();
const session = require("express-session");
const passport = require("./config/passport");
const logger = require("morgan");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Session and passport intializing
app.use(session({ secret: " bongo Cat ", resave: true, saveUninitialize: true}));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/keychain", { useNewUrlParser: true });

//database configuration with mongoose
var databaseUri = "mongodb://localhost/keychain";

  if (process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI);
  }
  else {
    mongoose.connect(databaseUri);
  };


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
