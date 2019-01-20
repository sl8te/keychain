import React, { Component } from "react";
import API from "../../utils/API";
import { throws } from "assert";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Authenticate extends Component {
  // Setting the component's initial state
  state = {
    requests: [],
    friends: [],
    i: 0
  };

  // page will checkAuth when it is mounted
  componentDidMount() {
      // this.checkAuth to call command at the correct time
      this.checkAuth();
      this.loadFriends();
      API.findAllRequests()
      .then(res => console.log(res.data));
      API.findAllFriends()
      .then(results => console.log(results.data));
      // this.loadRequests();
  }

  loadFriends = () => {
    API.findAllFriends()
      .then(res => this.setState({ friends: res.data }))
      .catch(err => console.log(err));
  }
  // defining check auth
  checkAuth = () => {
    // api call to find the user using our cookie information
    API.findOneUser().then(dbUser => {
        // find out what info you're getting back in the front end
        console.log(dbUser);
        // check if the data you're getting back has the properties you're looking for
        if(dbUser.data.firstName){
        // set state to fill what the user state is.  Will just add to state
        this.setState(dbUser.data);
      }
    })
  }

  // loadRequests = () => {
  //   if(i < res.data.length) {

  //   }
  // }

  render() {
    // render desired page on the if statement
    if(this.state.firstName){
        return (
          <Container fluid>
            <h1>Hello {this.state.firstName}</h1>
            <Col size="md-12">
              {this.state.friends.length ? (
                <List>
                  {this.state.friends.map(friend => (
                    <ListItem key={friend._id}>
                      <strong>
                        {friend.firstName} {friend.lastName}
                      </strong>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No friends to Display</h3>
              )}
            </Col>
          </Container>
        )
    }
    // Courtesy call for the user if they reach this screen without logging in
    else{
        return(
            <h1>Please go to login screen</h1>

        )
    }
  }
}

export default Authenticate;
