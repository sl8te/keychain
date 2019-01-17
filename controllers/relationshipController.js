const db = require("../models");

// Defining methods for the userController
module.exports = {
    // find all users in a search, may not be used on the final website
    // but good for testing the user creation process
    findAllFriendRequests: function(req, res) {
        db.Relationship
            // this line is to test that the route works
            // .find(req.body)
            // the line below will be what's actually in use, can only test when front end is complete on this side
            .find({ status: 0 , $or:[{ userOneId: req.user._id },{ userTwoId: req.user._id }]})
            .then(dbRelationship => res.json(dbRelationship))
            
            .catch(err => res.status(422).json(err));
    },
    findOneFriend: function(req, res) {
        db.Relationship
            // this will test that the route works
            .findOne({ status: 1 , $or:[{ userOneId: req.body._id },{ userTwoId: req.body._id }]})
            // the line beolw will be what's actually in use, can only test when front end is complete on this side
            // .find({ status = 1 , $or:[{ user}]})
    },
    // for finding all friends of a user in a search
    findAllFriends: function(req, res) {
        // console.log(req.body);
        db.Relationship
            // testing in postman
            // .find(req.body)
            // testing in production
            .find({ status: 1 , $or:[{ userOneId: req.body._id },{ userTwoId: req.body._id }]})
            .populate("userOneId")
            .populate("userTwoId")
            // If we're able to successfully pull some relationships, let's start the recursion process to retrieve our friends
            .then(dbRelationship => {
                // defining an empty array to put opposite user id in
                return 
                var friendList = [];
                // set up a counter to start at 0
                var i = 0;
                console.log(friendList, i);
                // // if i is less than dbRelationship.length, continue the function
                function pushToFriendsList(){
                    if (i < dbRelationship.length) {
                        // we want to capture the user that isn't the one querying the list
                        if (dbRelationship[i].userOneId === req.body._id) {
                            // first we push the opposite id of the request user to friendsList
                            friendList.push(dbRelationship[i].userTwoId);
                            // then increase i by one
                            i++;
                            console.log(i);
                            // then we call the function again
                            pushToFriendsList();
                        } else if (dbRelationship[i].userTwoId === req.body._id){
                            // push opposite id of the request user to friendsList
                            friendList.push(dbRelationship[i].userOneId);
                            // increase i by one
                            i++;
                            console.log(i);
                            // call the function again
                            pushToFriendsList();
                        } 
                    } else {
                        // console.log(friendList);
                        // res.json(friendList);
                    }
                }
                // first instance of this function calling itself
                pushToFriendsList();
            })
                // let friendslist  
                // res.json(dbRelationship))
            .then(friendList => res.json(friendList))
            // since I have access to all of the models I would like to then check in the Users table for the friend
            // I want to set up a recursive statement to find each friend in the json list after I get all of the results back
            // This statement should be the length of dbRelationship, then have find statement
            // for each user that isn't the logged in user, since userOneId or UserTwoId can be the current user
            // we will want an if statement and an else if statement, the else statement will stop the function
            .catch(err => res.status(422).json(err));
    },
    // for creating a Relationship, the req.body should have first name, last name, email and password
    addFriendRequest: function(req, res) {
        db.Relationship
            .create(req.body)
            .then(dbRelationship => res.json(dbRelationship))
            .catch(err => res.status(422).json(err));
    },
    // for accepting a friendship that was requested, will not necessarily need a body, but needs params to identify which relationship we're updating
    acceptFriend: function(req, res) {
        console.log(req.body);
        db.Relationship
            .findOneAndUpdate({ _id:req.params.id},{ status: req.body.status }, { new: true})
            .then(dbRelationship => res.json(dbRelationship))
            .catch(err => res.status(422).json(err));
    },
    // for denying a friendship, do not need to have a status, but will need to delete the request id
    denyRequest: function(req, res) {
        db.Relationship
            .deleteOne({ _id: req.params.id })
            .then(dbRelationship => res.json(dbRelationship))
            .catch(err => res.status(422).json(err));
    }
};