import React, {Component} from "react";

// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class FriendsList extends Component {}
constructor(props); 
{ this.state= {
    friends: [],
    fullName: "",
    keychain: "",
    thumbnail: "", 
 }}; 
 componentDidMount(){
     this.loadFriends();
 }
 loadFriends=()=> {
    API.getFriends().then(res => this.setState({friends: res.data, fullName: "", keychain: "", thumbnail: ""})) .catch(err => console.log(err));
 };
// deleteFriendList = id => {
//     API.deleteFriendList(id)
//       .then(res => this.FriendsList())
//       .catch(err => console.log(err));
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };


render();
{
    return (
    <Container>
        <Div class="card">
            <Image>{this.thumbnail}
                {/* {this.friendsThumbnail} i.e. the friend's profile image */}
            </Image>
            <Div class="card-body">
                <h5 class="card-title"> {this.fullName}
                    {/* {this.fullName} i.e. the friend's first and last name*/}
                </h5>
                <p>
                    Click the button to view {this.fullName}
                    {/* {this.fullName} */} 
                    's keys.
                </p>
                <a href="" class="btn btn-primary">{this.keychain}
                    {/* {this.friendsKeychainLink} i.e. the link to friends keychain profile.*/}
                </a>
            </Div>
        </Div>
    </Container>

    );
}

// //Move to a component item? 
// function Thumbnail({src}){
//     return(
//         <Div className="thumbnail" style= "`url(${src})" />
        
//     )
// }
 export function FriendsList();
