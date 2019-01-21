const mongoose = require("mongoose");
const db = require("../models/friends");
mongoose.connect("mongodb://localhost:27017/Friends", { useNewUrlParser: true });
const friendsSeed = [
    {
    fullName: "Steve the Tech Guy",
    keychain: "link to keycain",
    thumbnail: "link to thumnail"
    }
];
db.friendsSeed;
