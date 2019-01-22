const friends = new Schema({
    fullName: { type: String, required: true },
    keychain: { type: String, required: true },
    thumbnail: { type: String}
  });
  
  const Friends = mongoose.model("friends", friendsSchema);
  
  module.exports = Friends;
  
  