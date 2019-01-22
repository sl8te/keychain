import React, { Component } from "react";
import { FormErrors } from './FormErrors';
import API from "../../utils/API";

class Signup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      photoLink: '',
      formErrors: {email: '', password: '', confirmPassword: ''},
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},() => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':        
        passwordValid = value.match(/^[A-Z]{1}[A-Za-z0-9]{5,10}$/);
        fieldValidationErrors.password = passwordValid ? '': ' does not match';
        console.log(passwordValid);
        break;
      case 'confirmPassword':       
        if(this.state.confirmPassword === this.state.password){
          confirmPasswordValid = true;
          fieldValidationErrors.confirmPassword = "";
        }
        else{
          confirmPasswordValid = false;
          fieldValidationErrors.confirmPassword = " does not match!";
        }
        console.log(confirmPasswordValid);
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,  
                    confirmPasswordValid: confirmPasswordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPassword});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(`{ email: ${this.state.email}, password: ${this.state.password}, firstName: ${this.state.firstName}, lastName: ${this.state.lastName} }`);
    API.createUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      photoLink: this.state.photoLink
    })
    .then(result => console.log(result))
  }

  render () {
    return (
      <form className="signupForm">
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="col-md-8">
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <label htmlFor="email">Email address</label>
            <input type="email" required className="form-control" name="email"
              placeholder="Email" required
              value={this.state.email}
              onChange={this.handleUserInput}  autoFocus/>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <label htmlFor="password">Password must contain at least 1 uppercase letter and be 6 to 10 characters long.</label>          
            <input type="password" className="form-control" name="password"
              placeholder="Password" required
              value={this.state.password}
              onChange={this.handleUserInput}  />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>          
            <input type="password" className="form-control" name="confirmPassword"
              placeholder="Confirm Password" required
              value={this.state.confirmPassword}
              onChange={this.handleUserInput}  />
          </div>
          <div className={'form-group'}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName"
              placeholder="First Name" required
              value={this.state.firstName}
              onChange={this.handleUserInput}  />
          </div>
          <div className={'form-group'}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" name="lastName"
              placeholder="Last Name" required
              value={this.state.lastName}
              onChange={this.handleUserInput}  />
          </div>
          <div className={'form-group'}>
            <label htmlFor="photoLink">Link for profile photo</label>
            <input type="text" className="form-control" name="photoLink"
              placeholder="Optional" required
              value={this.state.photoLink}
              onChange={this.handleUserInput}  />
          </div>  
        </div>                
        <button type="button" className="btn" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Sign up</button>
      </form>
    )
  }
}

export default Signup;
