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
  findOneUser: function() {
    return axios.get("/api/users/me");
  },
  editUser: function(editRes) {
    return axios.put("/api/users/", editRes);
  },
  findOtherUser: function(id) {
    return axios.get("/api/users/view/" + id);
  },
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // user all routes
  createUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  findAllUsers: function() {
    return axios.get("/api/users");
  },
  // =======================================
  // login routes
  loginUser: function(loginUser) {
    return axios.post("/api/login", loginUser);
  },
  logoutUser: function() {
    return axios.get("/api/logout");
  },

  //========================================
  // keychain all routes
  addKey: function(keyData) {
    return axios.post("/api/keychain", keyData);
  },
  findKeys: function(keyData) {
    return axios.get("/api/keychain", keyData);
  },

  // keychain id routes
  editKey: function(id) {
    return axios.put("/api/keychain/" + id);
  },
  findOneKey: function(id) {
    return axios.get("/api/keychain/" + id);
  },
  deleteKey: function(id) {
    return axios.get("/api/keychain/" + id);
  },

   //========================================
   // relationship all routes
  addFriend: function(friendData) {
    return axios.post("/api/relationships", friendData);
  },
  findAllFriends: function(friendData) {
    // this should be handled later by req.user, but keep a body for now
    return axios.get("/api/relationships", friendData);
  },
  findAllSentRequests: function(id) {
    // this should be handled by req.user, but show all requests sent to others
    return axios.get("/api/relationships/sent/" + id);
  },
  findAllRecievedRequests: function(id) {
    // req.user, but show all requests recieved
    return axios.get("/api/relationships/recieved/" + id);
  },
  checkFriendStatus: function(id) {
    return axios.get("/api/relationships/" + id);
  },
  acceptRequest: function(id) {
    return axios.put("/api/relationships/" + id);
  },
  deleteFriend: function(id) {
    return axios.delete("/api/relationships/" + id);
  },
};
