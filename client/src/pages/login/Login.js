import React, { Component } from "react";

class Login extends Component {
    constructor (props) {
      super(props);
      this.state = {
        email: '',
        password: '',        
      }
    }
  
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},() => { this.validateField(name, value) });
    }  
  
    render () {
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
          <button type="submit" className="btn">Login</button>
        </form>
      )
    }
  }
  
  
  export default Login;
  