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
      .then(res => {
        console.log(res.data);
        this.setState({ sent: res.data })
      })
      .catch(err => console.log(err));
  }

  loadRecieved = () => {
    API.findAllRecievedRequests()
      // need to preserve all of the data, but only need to show on screen the OTHER user
      .then(res => {
        console.log(res.data);
        this.setState({ recieved: res.data })
      })
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
            <Col size="md-12 profileContent">
              <img className="UserPhoto" alt={this.state.firstName} src={this.state.photoLink} />
              <h1>Hello {this.state.firstName}</h1>
              <br/>
            </Col>
            <Col size="md-12">
              <h2>Friends List</h2>
              {this.state.friends.length ? (
                <div className="card">
                  {this.state.friends.map(friend => (
                    <div className="card-body" key={friend._id}>
                      <Link to={"/view/" + friend._id}>
                        <img className="friendImg" src={friend.photoLink} alt={friend.firstName} />
                        <strong className="friendName">
                          {friend.firstName} {friend.lastName}
                        </strong>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>Loading friends</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Sent friend Requests</h2>
              {this.state.sent.length ? (
                <div className="card">
                  {this.state.sent.map(sent => (
                    <div className="card-body" key={sent._id}>
                    <img className="friendImg" src={sent.userTwoId.photoLink} alt={sent.userTwoId.firstName} />
                        <strong className="friendName">
                          {sent.userTwoId.firstName} {sent.userTwoId.lastName}
                        </strong>
                        <button type="button" className="btnDelete btn-danger" onClick={() => this.handleDeleteFriend(sent._id)}>Delete Request</button>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>Loading Sent Requests</h3>
              )}
            </Col>
            <Col size="md-12">
              <h2>Recieved friend Requests</h2>
              {this.state.recieved.length ? (
                <div className="card">
                  {this.state.recieved.map(request => (
                    <div className="card-body" key={request._id}>
                    <img className="friendImg" src={request.userOneId.photoLink} alt={request.userOneId.firstName} />
                      <strong className="friendName">
                        {request.userOneId.firstName} {request.userOneId.lastName}
                      </strong>
                      <button type="button" className="btnDelete btn-danger" onClick={() => this.handleDeleteFriend(request._id)}>Deny</button> 
                      <button type="button" className="btnAccept btn-success" onClick={() => this.handleAcceptFriend(request._id)}>Accept</button> 
                    </div> 
                  ))}
                </div>
              ) : (
                <h3>Waiting for Recieved Requests</h3>
              )}
            </Col>
            <br/>
            <br/>
            <div className="searchBtn">
              <button className="btnHome" onClick={this.handleLogout}>Logout</button>
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
