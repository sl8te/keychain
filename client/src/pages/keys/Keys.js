import React, { Component } from "react";
import API from "../../utils/API";


class Keys extends Component {
    constructor (props) {
      super(props);
      this.state = {
        platform: '',
        userName: '',
        profileLink: '',
        keys: []
      }
    }

    componentDidMount() {
        this.checkAuth();
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