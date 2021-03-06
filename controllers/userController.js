const db = require("../models");

// Defining methods for the userController
module.exports = {
    // find all users in a search, may not be used on the final website
    // but good for testing the user creation process
    findAll: function(req, res) {
        db.User
            .find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    // for finding an indivdual user in a search
    findOneUser: function(req, res) {
        db.User
            .findOne(req.user._id)
            .populate("keychains")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    findOtherUser: function(req, res) {
        db.User
            .findOne({ _id: req.params.id })
            .populate("keychains")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    // for creating a user, the req.body should have first name, last name, email and password
    createUser: function(req, res) {
        db.User
            .create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    editUser: function(req, res) {
        console.log(req.body);
        db.User
            .findOneAndUpdate({ _id: req.user._id }, req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    deleteUser: function(req, res) {
        console.log(req.body);
        db.User
            .deleteOne({ _id: req.params.id })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    }
};