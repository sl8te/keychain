//import components for the friends list
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class FriendsList extends component {}
state= {
    friends: [],
    fullName: "",
    keychain: "",
    thumbnail: "", 
}; 
componentDidMount(){
    this.loadFriends();
}
loadFriends=()=> {
    API.getFriends().then(res => this.setState({friends: res.data, fullName: "", keychain: "", thumbnail: ""})
    ) .catch(err => console.log(err));
};

render() {
    return (
    <Container>
        <Row>
            <Col size="">
                <Thumbnail /> 
            </Col>
            <Col size="">
                <h3>{this.fullName}</h3>
            </Col>
            <Col size="">
            <p>Click the link here to view  the keys on this Friend's Keychain! </p>
            <a rel="noreferrer noopener" target="_blank" href={keychain}> Friends keychain Link ie. website.com/friend/:id</a>
            </Col>
        </Row>
    </Container>
    );
}

//Move to a component item? 
function Thumbnail({src}){
    return(
        <Div className="thumbnail" style= "`url(${src})" />
        
    )
}
export function FriendsList();