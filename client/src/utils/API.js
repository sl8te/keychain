import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // ========================================
  // here is where the api routes belong

  // ========================================
  // where the user requests belong
  findOneUser: function(id) {
    return axios.post("/api/users/" + id);
  },
  editUser: function(id, editRes) {
    return axios.put("/api/users/" + id, editRes);
  },
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },

  // user all routes
  createUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  findAllUsers: function(userData) {
    return axios.get("/api/users", userData);
  },
  // =======================================
  // login routes
  loginUser: function(loginUser) {
    return axios.post("api/login", loginUser);
  },
  logoutUser: function() {
    return axios.post("api/logout");
  },

  //========================================
  // keychain all routes
  addKey: function(keyData) {
    return axios.post("api/keychain", keyData);
  },
  findKeys: function(keyData) {
    return axios.get("api/keychain", keyData);
  },

  // keychain id routes
  editKey: function(id) {
    return axios.put("api/keychain/" + id);
  },
  findOneKey: function(id) {
    return axios.get("api/keychain/" + id);
  },
  deleteKey: function(id) {
    return axios.get("api/keychain/" + id);
  },

   //========================================
   // relationship all routes
  addFriend: function(friendData) {
    return axios.post("api/relationships", friendData);
  },
  findAllFriends: function(friendData) {
    // this should be handled later by req.user, but keep a body for now
    return axios.get("api/relationships", friendData);
  },
  // relationship id routes
  findAllRequests: function(id) {
    // same as 
    return axios.get("api/relationships/" + id);
  },
  checkFriendStatus: function(id, friendId) {
    return axios.get("api/relationships/requests/" + id, friendId);
  },
  acceptRequest: function(id) {
    return axios.put("api/relationships/" + id);
  },
  deleteFriend: function(id) {
    return axios.delete("api/relationships/" + id);
  },
};
