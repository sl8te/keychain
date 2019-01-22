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
                <h3>No friends to Display</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Sent friend Requests</h2>
              {this.state.sent.length ? (
                <List>
                  {this.state.sent.map(friend => (
                    <ListItem key={friend._id}>
                      <Link to={"/view/" + friend._id}>
                        <strong>
                          {friend.userTwoId.firstName} {friend.userTwoId.lastName}
                        </strong>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Sent Requests at this moment in time</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Recieved friend Requests</h2>
              {this.state.recieved.length ? (
                <List>
                  {this.state.recieved.map(friend => (
                    <ListItem key={friend._id}>
                      <strong>
                        {friend.userOneId.firstName} {friend.userOneId.lastName}
                      </strong>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No recieved Requests at this moment in time</h3>
              )}
            </Col>
            <br/>
            <br/>
            <div class="searchBtn">
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
