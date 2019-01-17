const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema =  mongoose.Schema;

const RelationshipSchema = new Schema({
    // All fields will be required at this point
    // User one will be the first user id in the schema
    // userOneId: {
    //     type: String,
    //     required: true
    // },
    // // userTwoId is the second user id entered
    // userTwoId: {
    //     type: String,
    //     required: true
    // },
    // Status will be how the relationship will be defined
    // Entry of 0 will mean the friend request was sent, but no answer as of yet
    // Entry of 1 is a set of accepted friends
    // Entry of 2 is a denied friend request
    status: {
        type: Number,
        required: true,
        default: 0
    },
    // Action index will be a log of the last person to commit an action on this row
    // should default to whomever was the last person in either userOneId or UserTwoId responded in the application
    // actionId: {
    //     type: String,
    //     required: true
    // }
    userOneId:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
    },
    userTwoId:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
    }
});

var Relationship = mongoose.model("Relationship", RelationshipSchema);

module.exports = Relationship;