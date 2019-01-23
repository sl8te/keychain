import React, { Component } from "react";
import API from "../../utils/API";
import { throws } from "assert";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class FriendsList extends Component {
  // Setting the component's initial state
  state = {
    sent: [],
    recieved: [],
    friends: []
  };

  // page will checkAuth when it is mounted
  componentDidMount() {
      // this.checkAuth to call command at the correct time
      this.checkAuth();
      this.loadFriends();
      this.loadSent();
      this.loadRecieved();
  }

  loadFriends = () => {
    API.findAllFriends()
      .then(res => this.setState({ friends: res.data }))
      .catch(err => console.log(err));
  }

  loadSent = () => {
    API.findAllSentRequests()
      // need to preserve all of the data, but only need to show on screen the OTHER user
      .then(res => this.setState({ sent: res.data }))
      .catch(err => console.log(err));
  }

  loadRecieved = () => {
    API.findAllRecievedRequests()
      // need to preserve all of the data, but only need to show on screen the OTHER user
      .then(res => this.setState({ recieved: res.data }))
      .catch(err => console.log(err));
  }
  
  // defining check auth
  checkAuth = () => {
    // api call to find the user using our cookie information
    API.findOneUser().then(dbUser => {
        // check if the data you're getting back has the properties you're looking for
        if(dbUser.data.firstName){
        // set state to fill what the user state is.  Will just add to state
        this.setState(dbUser.data);
      }
    })
  }

  handleLogout = () => {
    // console.log("attempting to log out");
    API.logoutUser().then(res => { 
      console.log(res);
      window.location.assign("/");
    });
  }

render() {
   // render desired page on the if statement
   //if (this.state.firstName){
    return (
    <Container fluid>
        <div class="card">
        {this.state.friends.length ? (
            <div className="results">
            {this.state.friends.map(friend => (
                <div className="card" key={friend._id}>
                    <img src={friend.photoLink} />
                    <h3>{friend.firstName} {friend.lastName}</h3>
                </div>
            ))}
            </div>
        ) : (
            <h3>Sorry you have no friends</h3>
        )}
        
         </div>
    </Container>

        );
    }
} 


 export default FriendsList;


 // import React, {Component} from "react";
// import Card from "../../components/Card"; 
// import { Col, Row, Container } from "../../components/Grid";
// // import API from "../utils/API";

// class FriendsList extends Component {
//     state = {
//         fullName: "",
//         keychain: "",
//         thumbnail:""
//     };
// constructor(props); 
// { this.state= {
//     friends: [],
//     fullName: "",
//     keychain: "",
//     thumbnail: "", 
//  }}; 
//  componentDidMount() {
//     this.loadFriends();
//  }
//  loadFriends=()=> {
//     API.getFriends()
//     .then(res => this.setState({friends: res.data, fullName: "", keychain: "", thumbnail: ""})
//     ) 
//     .catch(err => console.log(err));
//  };
// deleteFriendList = id => {
//     API.deleteFriendList(id)
//       .then(res => this.FriendsList())
//       .catch(err => console.log(err));
//   };
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };