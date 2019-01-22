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
        friendStatus: ''
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
          console.log(dbFriendship.data);
          this.setState({ friendStatus: dbFriendship.data.status });
      })
    }

    loadKeychain = () => {
      console.log(this.props.match.params.id);
      // will need to set another route for finding a user that is based on params.id
      API.findOtherUser(this.props.match.params.id).then(dbKeychain => {
          console.log(dbKeychain.data);
          console.log(dbKeychain.data.keychains);
          this.setState({ keyholder: dbKeychain.data });
          this.setState({ keys: dbKeychain.data.keychains });
        }
      )
    }

    render () {
      if(this.state.user.firstName) {
        return (   
        <Container>
        <h1>{this.state.keyholder.firstName} {this.state.keyholder.lastName}'s Keychain</h1>
          {this.state.keys.length ? (
            <List>
              {this.state.keys.map(key => (
                <ListItem key={key._id}>
                  <strong>
                    {key.account} {key.username}
                  </strong>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>{this.state.user.firstName} does not have any keys</h3>
          )}
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
  