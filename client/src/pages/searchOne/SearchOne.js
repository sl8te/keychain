import React, { Component } from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";

class Search extends Component {
    constructor (props) {
      super(props);   
      this.state = {
        search: ""
      }         
    }
  
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    };    

    handleSearch = () => {
      console.log(this.state.search);
      API.findAllUsers(this.state.search)      
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data })})
    }

    handleReturn = () => {        
      window.location.assign("/authenticate");     
    }
  
    render () {              
      return (
        <form className="searchForm">
          <h2>Search for Friends</h2>          
          <div className="col-md-8">
            <label htmlFor="search">Search and add Friends!</label>
            <input type="text" required className="form-control" name="search"
              placeholder="Friend's Name"             
              onChange={this.handleUserInput}  />
          </div>          
          <br/>
          <button type="button" className="btnHome" onClick={this.handleSearch}>Search</button>          
          <br/>
          <br/>
          <br/>
          <p>Return to account page</p>
          <button type="button" className="btnHome" onClick={this.handleReturn}>Return</button>
        </form>
        )
      }
    }
  
  
  
  export default Search;
  