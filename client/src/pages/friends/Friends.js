import React, {Component} from "react";
import Card from "../../components/Card"; 
import { Col, Row, Container } from "../../components/Grid";
// import API from "../utils/API";

class FriendsList extends Component {
    state = {
        fullName: "",
        keychain: "",
        thumbnail:""
    };

// constructor(props); 
// { this.state= {
//     friends: [],
//     fullName: "",
//     keychain: "",
//     thumbnail: "", 
//  }}; 
//  componentDidMount() {
//     this.loadFriends();
//  }
//  loadFriends=()=> {
//     API.getFriends()
//     .then(res => this.setState({friends: res.data, fullName: "", keychain: "", thumbnail: ""})
//     ) 
//     .catch(err => console.log(err));
//  };
// deleteFriendList = id => {
//     API.deleteFriendList(id)
//       .then(res => this.FriendsList())
//       .catch(err => console.log(err));
//   };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


render() {
    return (
    <Container fluid>
        <div class="card-card">
            <div class="card"> 
            <image > <a href=""></a>
                {/* {this.friendsThumbnail} i.e. the friend's profile image */}
            </image>
            <div class="card-body">
                <h5 class="card-title"> Person Name
                    {/* {this.fullName} i.e. the friend's first and last name*/}
                </h5>
                <p>
                    Click the button to view
                    {/* {this.fullName} */} 
                    's keys.
                </p>
                <a href="" class="btn btn-primary">
                    {/* {this.friendsKeychainLink} i.e. the link to friends keychain profile.*/}
                </a>
            </div>
        </div>
        </div>
    </Container>

        );
    }
}

// //Move to a component item? 
// function Thumbnail({src}){
//     return(
//         <Div className="thumbnail" style= "`url(${src})" />
        
//     )
// }
 export default FriendsList;
