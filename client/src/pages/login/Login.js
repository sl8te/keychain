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

    handleFormSubmit = event => {
      event.preventDefault();
      console.log("something");
      API.loginUser(this.state)
        .then((user) => {
          this.setState({user:user.data});
        })
        
    }
  
    render () {
      if (this.state.user) {
        return <Redirect to="/authenticate" user={this.state.user} />
      } else {
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
          <button type="button" className="btn" onClick={this.handleFormSubmit}>Login</button>
        </form>
        )
      }
    }
  }
  
  export default Login;
  