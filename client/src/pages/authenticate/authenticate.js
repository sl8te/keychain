import React, { Component } from "react";
import API from "../../utils/API";
import { throws } from "assert";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Authenticate extends Component {
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
        console.log(dbUser.data);
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

  handleEdit = () => {        
    window.location.assign("/account");     
  }

  handleSearch = () => {
    window.location.assign("/searchOne");
  }

  handleAcceptFriend = (id) => {
    API.acceptRequest(id)
    .then(res => {
      this.loadFriends();
      this.loadRecieved();
    })
  }

  handleDeleteFriend = (id) => {
    API.deleteFriend(id)
    .then(res => {
      this.loadFriends();
      this.loadSent();
      this.loadRecieved();
    })
  }

  render() {
    // render desired page on the if statement
    if(this.state.firstName){
        return (
          <Container fluid>
            <h1>Hello {this.state.firstName}</h1>
            <button className="btnHome" onClick={this.handleLogout}>Logout</button>
            <br/>
            <br/>
            <button className="btnHome" onClick={this.handleEdit}>Edit Account</button>
            <Col size="md-12">
              <h2>Friends List</h2>
              {this.state.friends.length ? (
                <List>
                  {this.state.friends.map(friend => (
                    <ListItem key={friend._id}>
                      <Link to={"/view/" + friend._id}>
                        <strong>
                          {friend.firstName} {friend.lastName}
                        </strong>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>Loading friends</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Sent friend Requests</h2>
              {this.state.sent.length ? (
                <List>
                  {this.state.sent.map(sent => (
                    <ListItem key={sent._id}>
                        <strong>
                          {sent.userTwoId.firstName} {sent.userTwoId.lastName}
                        </strong>
                        <button type="button" className="btnAccept btn-danger" onClick={() => this.handleDeleteFriend(sent._id)}>Delete Request</button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>Loading Sent Requests</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Recieved friend Requests</h2>
              {this.state.recieved.length ? (
                <List>
                  {this.state.recieved.map(request => (
                    <ListItem key={request._id}>
                      <strong>
                        {request.userOneId.firstName} {request.userOneId.lastName}
                      </strong>
                      <button type="button" className="btnAccept btn-success" onClick={() => this.handleAcceptFriend(request._id)}>Accept</button>
                      <button type="button" className="btnAccept btn-danger" onClick={() => this.handleDeleteFriend(request._id)}>Deny</button> 
                    </ListItem> 
                  ))}
                </List>
              ) : (
                <h3>Waiting for Recieved Requests</h3>
              )}
            </Col>
            <br/>
            <br/>
            <div className="searchBtn">
              <button type="button" className="btnSearch" onClick={this.handleSearch}>Search for Friends</button>
            </div>
          </Container>
        )
    }
    // Courtesy call for the user if they reach this screen without logging in
    else {
        return(
          <h1>Must be logged in to view this page.  You may do so <a href="/login">here</a>.</h1>
        )
    }
  }
}

export default Authenticate;
