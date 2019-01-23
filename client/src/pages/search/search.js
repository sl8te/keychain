import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Search extends Component {
    state = {
        search : "", 
        results : []
    }
    componentDidMount() {
        console.log("search works");
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.search) {
            console.log(this.state.search)
        }
    }

    render() {
        return (
            <Container fluid>
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
                <List>
                    {/* here is where our results will show */}
                </List>
             </Container>  
        )
    }
}

export default Search;