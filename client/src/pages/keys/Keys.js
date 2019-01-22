import React, { Component } from "react";
import API from "../../utils/API";


class Keys extends Component {
    constructor (props) {
      super(props);
      this.state = {
        account: '',
        username: '',
        link: '',
        keys: []
      }
    }

    componentDidMount() {
        this.checkAuth();
        this.loadKeys();
    }

    // defining check auth
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

    //define loadKeys here
    loadKeys = () => {
        API.findKeys()
        .then(res => this.setState({ keys: res.data }))
        .catch(err => console.log(err));
    }
     
    //remove a key from a user
    deleteKey = id => {
        API.deleteKey(id)
        .then(res => this.loadKeys())
        .catch(err => console.log(err));
    }

    //handle input function
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    //saving a key and updating the user table
      handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.user) {
          API.addKey({
            account: this.state.account,
            userName: this.state.username,
            proflileLink: this.state.link
          })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
      };

    //edit button onClick to route to edit page?
    //maybe there is no edit button and if you want to change it, you just delete it and re-create it in the bottom section


    render () {
        if (this.state.firstName) {
        return (
                <div className="container-fluid">
                    <form className="Keys">
                    <br></br>
                        <h2>{this.state.firstName}'s Keys</h2>
                        <br></br>
                        <div className="row">
                            <div className= "key-wrapper">
                                <div className="col-sm-8" id="key-list">
                                    <p id="platform_name">Platform/App</p>
                                    <p id="platform_username">Username</p>
                                    <p id="platform_profile_link">Profile link</p>
                                </div>
                                <div className="col-sm-4" id="btn-wrapper">
                                    <button type="button" class="btn btn-success" id="edit-btn">Edit</button> 
                                    <button type="button" class="btn btn-danger" id="delete-btn">X</button> 
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <h3>Add A Key</h3>
                            <br></br>
                        <div className="row" id="add-key">
                            <div className="col-sm-9">
                            <div className={'form-group'}>
                                <label htmlFor="platform">Platform/App</label>
                                <input type="text" className="form-control" name="platform" placeholder="Xbox One"/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="userName">User Name</label>
                                <input type="text" className="form-control" name="userName" placeholder="Halo_Addict2099"/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="profileLink">Profile Link (optional)</label>
                                <input type="text" className="form-control" name="profileLink" placeholder="Profile Link"/>
                            </div>
                            </div>
                            <div className="col-sm-3">
                                <button type="button" class="btn btn-primary" id="submit-btn">Submit</button> 
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        // Courtesy call for the user if they reach this screen without authentication
        else{
            return (
                <h1>Must be logged in to view this page.  You may do so <a href="/login">here</a>.</h1>
            )
        }
    }
}

export default Keys;

//navbar dropdown for links
/* <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropLinks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars"></i>
    Dropdown link
  </a>

  <div class="dropdown-menu" aria-labelledby="dropLinks">
    <a class="dropdown-item" href="#">Search for Friends</a>
    <a class="dropdown-item" href="#">Log Out</a>
    <a class="dropdown-item" href="#">Search for Friends</a>
  </div>
</div> */

// link to font-awesome to make icon button for nav links:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

// bars button icon
// <button class="btn"><i class="fa fa-bars"></i></button>