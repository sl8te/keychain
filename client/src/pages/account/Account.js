import React, { Component } from "react";
import { FormErrors } from './FormErrors';
import API from "../../utils/API";
// const bcrypt = require("bcrypt-nodejs");


class Account extends Component {
  constructor (props) {
    super(props);
    this.state = {     
      password: '',
      isChanging: false,
      confirmPassword: '',
      firstName: '',
      lastName: '',     
      formErrors: {password: '', confirmPassword: ''},     
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false
    }
  }

  componentDidMount() {
    this.checkAuth();
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
      passwordValid = value.match(/^[A-Z]{1}[A-Za-z0-9]{5,10}$/);
        fieldValidationErrors.password = passwordValid ? '': ' is invalid';
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
                    passwordValid: passwordValid,  
                    confirmPasswordValid: confirmPasswordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.passwordValid && this.state.confirmPassword});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  checkAuth = () => {
    // api call to find the user using our cookie information
    API.findOneUser().then(dbUser => {
      // check if the data you're getting back has the properties you're looking for
      if(dbUser.data.firstName){
      // set state to fill what the user state is.  Will just add to state
      this.setState(dbUser.data);
    }
  })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`{ password: ${this.state.password}, firstName: ${this.state.firstName}, lastName: ${this.state.lastName} }`);
    API.editUser({
      // password: this.state.passwordValid,
      // password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null),
      firstName: this.state.firstName,
      lastName: this.state.lastName
    })
    .then( result => {
      console.log(result);
      window.location.assign("/login");
    })    
  }

  handleCancel = () => {   
    API.editUser().then(res => {       
      window.location.assign("/authenticate");
    });
  }

  // deleteItem = event => {
  //   event.preventDefault();
  //   API.deleteUser({

  //   }).then( result => {
  //     window.location.assign("/");
  //   })
  // } 
  
  render () {
    if(this.state.firstName) {
      return (
        <form className="accountForm">
         <h1>Hello {this.state.firstName}</h1>         
          <h2>Account Details</h2>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          {/* <div className="col-md-8">              
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
              <label htmlFor="password">Change Password (must contain at least 1 uppercase letter and be 6 to 10 characters long)</label>          
              <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput}  autoFocus/>
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" name="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleUserInput}  />
            </div> */}
            <div className={'form-group'}>
              <label htmlFor="firstName">Change First Name *** Highlight name to change. 
                Do Not backspace to change name.  Name is required.</label>
              
              <input type="text" className="form-control" name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleUserInput}  />
            </div>
            <div className={'form-group'}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleUserInput}  />
            </div> 
            <div className={'form-group'}>
            <label htmlFor="photoLink">Change profile photo</label>
            <input type="text" className="form-control" name="photoLink"
              placeholder="Photo Link"
              value={this.state.photoLink}
              onChange={this.handleUserInput}  />
          </div>  
          {/* </div>        */}
          {/* <button type="submit" className="btn" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Submit Changes</button> */}
          <button className="btnHome" onClick={this.handleFormSubmit}>Submit Changes</button>&nbsp;&nbsp;&nbsp;&nbsp;          
          <button className="btnHome" onClick={this.handleCancel}>Cancel</button>
          <br/>
          <br/>
          {/* <button type="submit" className="btn btn-danger" >Delete Account</button> */}
          <button className="deleteBTN" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e) } }>
                Delete Account</button>
        </form>
      )
    }
    else {
      return(
        <h1>Must be logged in to view this page.  You may do so <a href="/login">here</a>.</h1>
      )
    }
  }
}

export default Account;
