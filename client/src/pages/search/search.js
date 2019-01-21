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
                <form>
                    <Input
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    name="seach bar"
                    />
                    <FormBtn
                    disabled={!this.state.search}
                    onClick={this.handleFormSubmit}
                    >Submit
                    </FormBtn>
                </form>
                <List>
                    {/* here is where our results will show */}
                </List>
             </Container>  
        )
    }
}

export default Search;