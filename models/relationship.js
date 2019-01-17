const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema =  mongoose.Schema;

const RelationshipSchema = new Schema({
    // All fields will be required at this point
    // Status will be how the relationship will be defined
    // Entry of 0 will mean the friend request was sent, but no answer as of yet
    // Entry of 1 is a set of accepted friends
    // Entry of 2 is a denied friend request
    status: {
        type: Number,
        required: true,
        default: 0
    },
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