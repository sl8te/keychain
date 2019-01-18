import React, { Component } from "react";
import API from "../../utils/API";

class Authenticate extends Component {
  // Setting the component's initial state
  state = {
    firstName: "",
    lastName: "",
    password: ""
  };

  componentDidMount() {
      this.checkAuth();
  }

  checkAuth = () => {
    API.findOneUser().then(dbUser => {
      console.log(dbUser);
      if(dbUser.data.firstName){
        this.setState(dbUser.data);
      }
    })
  }

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    if(this.state.firstName){
        return (
            <h1>Hello {this.state.firstName}</h1>
          );
    }
    else{
        return(
            <h1>Please go to login screen</h1>
        )
    }
  }
}

export default Authenticate;
