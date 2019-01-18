import React, { Component } from "react";
import API from "../../utils/API";

class Authenticate extends Component {
  // Setting the component's initial state
  state = {
  };

  // page will checkAuth when it is mounted
  componentDidMount() {
      // this.checkAuth to call command at the correct time
      this.checkAuth();
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

  render() {
    // render desired page on the if statement
    if(this.state.firstName){
        return (
            <h1>Hello {this.state.firstName}</h1>
          );
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
