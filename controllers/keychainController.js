const db = require("../models");

// Defining methods for the userController
module.exports = {
    // find all users in a search, may not be used on the final website
    // but good for testing the user creation process
    findAll: function(req, res) {
        db.User
            .find({ _id: req.user._id })
            .populate("keychains")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    // for finding an indivdual user in a search
    findOneKey: function(req, res) {
        db.Keychain
            .findOne({ _id: req.params.id })
            .then(dbKeychain => res.json(dbKeychain))
            .catch(err => res.status(422).json(err));
    },
    // for creating a user, the req.body should have first name, last name, email and password
    createKey: function(req, res) {
        db.Keychain
            .create(req.body)
            .then(dbKeychain => {
                return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { keychains: dbKeychain._id } }, { new: true })
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    // when we need to edit an individual key on the keychain
    editKey: function(req, res) {
        db.Keychain
            .findByIdAndUpdate({ _id:req.params.id }, req.body , { new: true})
            .then(dbKeychain => res.json(dbKeychain))
            .catch(err => res.status(422).json(err));
    },
    // when we need to delete a key
    deleteKey: function(req, res) {
        db.Keychain
            .deleteOne({ _id: req.params.id })
            .then(dbKeychain => {
                console.log(dbKeychain);
                res.json(dbKeychain);
            })
            .catch(err => res.status(422).json(err));
    }
};