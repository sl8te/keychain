import React, { Component } from "react";
import { FormErrors } from './FormErrors';


class Account extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      key: '',
      formErrors: {password: '', confirmPassword: ''},     
      passwordValid: false,
      confirmPassword: false,
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
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch(fieldName) {      
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'confirmPassword':
        confirmPasswordValid = passwordValid;
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': ' does not match';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,                    
                    passwordValid: passwordValid,  
                    confirmPasswordValid: confirmPasswordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="accountForm">
        <h2>Account</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        {/* <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  autoFocus/>
        </div> */}
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Change Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password" required
            value={this.state.password}
            onChange={this.handleUserInput}  autoFocus/>
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
          <label htmlFor="key">Keys</label>
          <input type="text" className="form-control" name="key"
            placeholder="Enter key"
            value={this.state.key}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
      </form>
    )
  }
}

export default Account;
