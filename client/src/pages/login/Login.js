import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor (props) {
      super(props);
      
      this.state = {
        email: '',
        password: '',
        user: ''
      }
    }
  
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value
      });
    };  

    // handleFormSubmit sends a post route to the server to log in
    handleFormSubmit = event => {
      event.preventDefault();
      // compare this.state against passport
      API.loginUser(this.state)
        // if it works user may or may not be in a larger object.  Double check the json data to see where your desired info is
        .then((user) => {
          // set user to be the desired info
          this.setState({user:user.data});
        })
    }
  
    render () {
      // check for user
      if (this.state.user) {
        // If the user exists, redirect to your desired page
        return <Redirect to="/friends" user={this.state.user} />
      } else {
      // we need to have the ability for the user to log in  
      return (
        <form className="loginForm">
          <h2>Login</h2>          
          <div className="col-md-8">
            <label htmlFor="email">Email address</label>
            <input type="email" required className="form-control" name="email"
              placeholder="Email" required
              value={this.state.email}
              onChange={this.handleUserInput}  autoFocus/>
          </div>
          <div className="col-md-8">
            <label htmlFor="password">Password</label>          
            <input type="password" className="form-control" name="password"
              placeholder="Password" required
              value={this.state.password}
              onChange={this.handleUserInput}  />
          </div>
          <br/>
          <br/>
          <button type="button" className="btnHome" onClick={this.handleFormSubmit}>Login</button>
        </form>
        )
      }
    }
  }
  
  
  export default Login;
  