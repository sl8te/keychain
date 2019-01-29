import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
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

    handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = event.target;

      // Updating the input's state
      this.setState({
        [name]: value
      });
    };    

    handleSearch = () => {
      API.findAllUsers()      
      .then(res => {
        this.setState({ users: res.data })})
    }

    handleReturn = () => {        
      window.location.assign("/friends");     
    }
    
    handleAddFriend = id => {
      API.addFriend({
        userOneId: this.state.user._id,
        userTwoId: id
      }).then(friendRequest => {
        window.location.assign("/friends");
      })
    }

    // defining check auth
  checkAuth = () => {
    // api call to find the user using our cookie information
    API.findOneUser().then(dbUser => {
        // check if the data you're getting back has the properties you're looking for
        if(dbUser.data.firstName){
        // set state to fill what the user state is.  Will just add to state
        // console.log(dbUser.data);
        this.setState({ user: dbUser.data});
      }
    })
  }

    render () {
      if(this.state.user.firstName){
      let filteredUsers = this.state.users.filter(
        (user) => {
          return user.firstName.toLowerCase().indexOf(this.state.
            search.toLowerCase()) !== -1;
        }
      );
      return (
        <div>
          <form className="form-inline my-2 my-lg-0">
            <input 
            className="form-control mr-sm-2"
            type="search" 
            name="search" 
            value={this.state.search} 
            placeholder="Search" 
            aria-label="Search" 
            onChange={this.handleInputChange}
            />
          </form>
            <h2>User Directory</h2>          
            <br/>
            <div className="col-md-12">
              {filteredUsers.length ? (
                <div className="card">
                  {filteredUsers.map(user => (
                    <div className="card-body" key={user._id}>
                        <img className="friendImg" src={user.photoLink} />
                        <strong className="friendName">{user.firstName} {user.lastName}</strong>
                        <button type="button" className="btnAddfriend btn-success" onClick={() => this.handleAddFriend(user._id)}>Add Friend</button>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>Cannot find this specific user</h3>
              )}
            </div>
            <button type="button" className="btnHome" onClick={this.handleReturn}>Return</button>`
          </div>
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
  