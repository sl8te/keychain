import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
// import Fuse from "fuse.js";

class Search extends Component {
    constructor (props) {
      super(props);   
      this.state = {
        search: "",
        users: [],
        user: ''
      }        
    }
    
    componentDidMount() {
      this.handleSearch();
      this.checkAuth();
    }

    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    };    

    handleSearch = () => {
      API.findAllUsers()      
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data })})
    }

    handleReturn = () => {        
      window.location.assign("/authenticate");     
    }
    
    handleAddFriend = id => {
      API.addFriend({
        userOneId: this.state.user._id,
        userTwoId: id
      }).then(friendRequest => {
        console.log(friendRequest);
        window.location.assign("/authenticate");
      })
    }

    // defining check auth
  checkAuth = () => {
    // api call to find the user using our cookie information
    API.findOneUser().then(dbUser => {
        // check if the data you're getting back has the properties you're looking for
        if(dbUser.data.firstName){
        // set state to fill what the user state is.  Will just add to state
        console.log(dbUser.data);
        this.setState({ user: dbUser.data});
      }
    })
  }

    render () {
      if(this.state.user.firstName){
      return (
        <form className="searchForm">
          <h2>User Directory</h2>          
          <br/>
          <div className="col-md-12">
            {this.state.users.length ? (
              <div>
                {this.state.users.map(user => (
                  <div className="card" key={user._id}>
                      <p>{user.firstName} {user.lastName}</p>
                      <button type="button" className="btnAdd btn-success" onClick={() => this.handleAddFriend(user._id)}>Add Friend</button>
                  </div>
                ))}
              </div>
            ) : (
              <h3>Cannot find this specific user</h3>
            )}
          </div>
          <p>Return to account page</p>
          <button type="button" className="btnHome" onClick={this.handleReturn}>Return</button>
        </form>
          )
        }
        else {
          return (
            <h1>Must be logged in to view this page.  You may do so <a href="/login">here</a>.</h1>
          )
        }
      } 
    }
  
  
  
  export default Search;
  