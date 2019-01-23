import React, { Component } from "react";
import API from "../../utils/API";


class Keys extends Component {
    constructor (props) {
      super(props);
      this.state = {
<<<<<<< HEAD
        account: '',
        username: '',
        link: '',
=======
        platform: '',
        userName: '',
        profileLink: '',
        user: '',
>>>>>>> master
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
            this.setState({ user: dbUser.data });
            this.loadKeychain();
            }
        })
    }

<<<<<<< HEAD
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

    //add a key when you hit the submit button
    addKey = () => {
        API.addKey()
        .then(res=> this.loadKeys())
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

=======
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }

    handleAddKey = (event) => {
        event.preventDefault();
        API.addKey(this.state.user._id, {
            account: this.state.platform,
            username: this.state.userName,
            link: this.state.profileLink
        }).then(result => {
            // console.log(result);
            this.loadKeychain();
        })
    }

    loadKeychain = () => {
        // will need to set another route for finding a user that is based on params.id
        API.findOtherUser(this.state.user._id).then(dbKeychain => {
            // console.log(dbKeychain);
            this.setState({ keyholder: dbKeychain.data });
            if (dbKeychain.data !== null ){
              this.setState({ keys: dbKeychain.data.keychains });
            }
          }
        )
      }

      handleDeleteKey = id => {
          API.deleteKey(id)
          .then(res => {
              this.loadKeychain();
          })
      }
>>>>>>> master

    render () {
        if (this.state.user.firstName) {
        return (
                <div className="container-fluid">
                    <br></br>
<<<<<<< HEAD
                        <h2>{this.state.firstName}'s Keys</h2>
                        <br></br>
                        <div className="row">
                            <div className= "key-wrapper">
                                <div className="col-sm-8" id="key-list">
                                    <p id="platform_name">{this.state.account}</p>
                                    <p id="platform_username">{this.state.username}</p>
                                    <p id="platform_profile_link">{this.state.link}</p>
                                </div>
                                <div className="col-sm-4" id="btn-wrapper">
                                    <button className="btn btn-success" id="edit-btn">Edit</button> 
                                    <button className="btn btn-danger" id="delete-btn" onClick={this.deleteKey}>X</button> 
                                </div>
=======
                        <h2>{this.state.user.firstName}'s Keys</h2>
                        {this.state.keys.length ? (
                            <div>
                                {this.state.keys.map(key => (
                                    <div className="card" key={key._id}>
                                    <p>Account: {key.account}</p>
                                    <p href={key.link} target="blank" id={key._id}>Username: {key.username}</p>
                                    <button type="button" className="btnKeyDelete btn btn-danger" onClick={() => this.handleDeleteKey(key._id)}>Delete</button>
                                    </div>
                                ))}
>>>>>>> master
                            </div>
                        ) : (
                            <h3>No keys to display</h3>
                        )}
                        <br></br>
                        <br></br>
                    <form className="Keys">
                        <h3>Add A Key</h3>
                            <br></br>
                        <div className="row" id="add-key">
                            <div className="col-sm-9">
                            <div className={'form-group'}>
                                <label htmlFor="platform">Platform/App</label>
<<<<<<< HEAD
                                <input type="text" className="form-control" name="platform" placeholder="Xbox One" onChange={this.handleInputChange}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="userName">User Name</label>
                                <input type="text" className="form-control" name="userName" placeholder="Halo_Addict2099"    onChange={this.handleInputChange}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="profileLink">Profile Link (optional)</label>
                                <input type="text" className="form-control" name="profileLink" placeholder="Profile Link"    onChange={this.handleInputChange}/>
                            </div>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary" id="submit-btn" onClick={this.addKey}>Submit</button> 
=======
                                <input type="text" className="form-control" name="platform" value={this.state.platform} onChange={this.handleUserInput} placeholder="Xbox One"/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="userName">User Name</label>
                                <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.handleUserInput} placeholder="Halo_Addict2099"/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="profileLink">Profile Link (optional)</label>
                                <input type="text" className="form-control" name="profileLink" value={this.state.link} onChange={this.handleUserInput} placeholder="Profile Link"/>
                            </div>
                            </div>
                            <div className="col-sm-3">
                                <button type="button" className="btn btn-primary" id="submit-btn" onClick={this.handleAddKey}>Submit</button> 
>>>>>>> master
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