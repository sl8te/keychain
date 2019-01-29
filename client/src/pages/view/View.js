import React, { Component } from "react";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Container, Row, Col } from "../../components/Grid";

class View extends Component {
    constructor (props) {
      super(props);
      this.state = {
        keyholder: '',
        keys: [],
        friends: [],
        user: '',
        friendStatus: []
      }      
    }  

    componentDidMount() {
      this.checkAuth();
      this.checkFriendship();
      this.loadKeychain();
    }

    checkAuth = () => {
      // api call to find the user using our cookie information
        API.findOneUser().then(dbUser => {
          // check if the data you're getting back has the properties you're looking for
          if(dbUser.data.firstName){
          // set state to fill what the user state is.  Will just add to state
          this.setState({ user: dbUser.data });
        }
      })
    }

    checkFriendship = () => {
      API.checkFriendStatus(this.props.match.params.id).then(dbFriendship => {
          if(dbFriendship.data){
          this.setState({ friendStatus: dbFriendship.data[0] });
          // console.log(this.state.friendStatus)
          }
      })
    }

    loadKeychain = () => {
      // will need to set another route for finding a user that is based on params.id
      API.findOtherUser(this.props.match.params.id).then(dbKeychain => {
          // console.log(dbKeychain);
          this.setState({ keyholder: dbKeychain.data });
          if (dbKeychain.data !== null ){
            this.setState({ keys: dbKeychain.data.keychains });
          }
        }
      )
    }

    handleDeleteFriend = id => {
      API.deleteFriend(id)
      .then(res => {
        window.location.assign("/friends")
      })
    }

    render () {
      // this if statement will check if the user exists
      // Add additional conditional statement "&& this.state.friendStatus" between these
      if(this.state.user.firstName) {
        return (  
        <Container>
          <Col size="md-12 profileContent">
          <img className="UserPhoto" alt={this.state.keyholder.firstName} src={this.state.keyholder.photoLink} />
          <h1>{this.state.keyholder.firstName} {this.state.keyholder.lastName}'s Keychain</h1>
          </Col>
          <br/>
          <button type="button" className="btnUnfriend btn-danger" onClick={() => this.handleDeleteFriend(this.state.friendStatus._id)}>Unfriend</button>
          <br />
          {this.state.keys.length ? (
            <div className="card">
              {this.state.keys.map(key => (
                <div className="card-body" key={key._id}>
                  <strong>
                    Platform: {key.account} 
                  </strong>
                  <br />
                  <strong>
                    Username: <a href={key.link} target="blank">{key.username}</a>
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <h3>{this.state.keyholder.firstName} does not have any keys</h3>
          )}
        </Container>
        )
      }
      else if(this.state.user.firstName && (this.state.friendStatus.status == "2" && this.state.friendStatus.userOneId == this.state.user._id))  {
        return (
          <Container>
            <h1>{this.state.keyholder.firstName} {this.state.keyholder.lastName} has not responded to your friend request.  Check again later</h1>
            <button className="btn btn-danger">Delete Request</button>
          </Container>
        )
      }
      else {
        return(
          <h1>Must be logged in to view this page.  You may do so <a href="/login">here</a>.</h1>
        )
      }
    }
  }
    
  export default View; 
  