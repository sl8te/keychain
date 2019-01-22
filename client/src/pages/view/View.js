import React, { Component } from "react";

class View extends Component {
    constructor (props) {
      super(props);      
    }  

    render () {
      return (                
        <div className="homePage">
          <h1>Julian's Keychains</h1>  
          <p>Keychain one</p>
          <br/>
          <p>Keychain two</p>  
          <br/>    
          <p>Keychain three</p>
          <br/>               
        </div>
      )
    }
  }
    
  export default View; 
  