import React, { Component } from "react";
import API from "../../utils/API";


class Keys extends Component {
    constructor (props) {
      super(props);
      this.state = {
        platform: '',
        userName: '',
        profileLink: '',
        user: '',
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
            this.setState({ user: dbUser.data });
            this.loadKeychain();
            }
        })
    }

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

    render () {
        if (this.state.user.firstName) {
        return (
                <div className="container-fluid">
                    <br></br>
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