const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var KeychainSchema = new Schema({
  // `title` must be of type String
  account:{
    type: String,
    required: true
  },
  username: {
    type: String, 
    required: true
  },
  // `body` must be of type String
  link: String
});

// This creates our model from the above schema, using mongoose's model method
var Keychain = mongoose.model("Keychain", KeychainSchema);

// Export the Note model
module.exports = Keychain;
