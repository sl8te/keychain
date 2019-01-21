const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Schema for the user model
const UserSchema = new Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        // email requirement should be in the style of requiring it to look like an email 
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    photoLink: String,
    isLoggedIn: {
        type: Boolean
    },
    // keychains should link back to keychains
    keychains: [
        {
            // stores Id's in the array
            type: Schema.Types.ObjectId,
            // refers to the id's in the keychain model
            ref: "Keychain"
        }
    ]
  });

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

// use this to hash the password before the user account is created
UserSchema.pre('save', function(next) {
    let user = this;
    // use language from the libary for salting the password
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // console.log(user.password);
    console.log(user);
    // return user.password;
    next();
    });

const User = mongoose.model("User", UserSchema);

module.exports = User;