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

//--------Requiring Mongoose and opening a connection to our friends database------
//var mongoose = require('mongoose'); 
//mongoose.connect('mongodb://localhost:27017/friends');

//-------Is the connection to the database successful or not----------
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function(){
    ////we're connected!
//});

//-------Refers to the friendsSchema, defines our friends--------
//var friendsSchema = new mongoose.Schema({
//name: String
//});

//---------Complines the friendsSchema into a Model named 'Friends'----------
//var Friends = mongoose.model('Friends', friendsSchema);

//--------display all of our friends on the keychain app. We can access the friends documents through our Friends model-----
//Friends.find(function(err, friends){
 //if (errr) return console.error(err);
 //console.log(friends);
//})