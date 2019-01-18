import React, { Component } from "react";

class Home extends Component {
    constructor (props) {
      super(props);      
    }  

    render () {
      return (                
        <div className="home">
          <h1>Keychain</h1>  
          <h3>A place to keep all your account links and connect with friends</h3>  
          <br/>
          <p>Keychain keeps all account links in one place and allows you to connect and share
            your account links with friends.</p>      
          <p>Share Facebook, LinkedIn and all your gaming sites to make it easier to connect and start
            sharing with friends!</p>
          <br/>
          
          <p>Login to your account</p>
          <button type="submit" className="btnHome">Login</button>
          <br/>
          <br/>
          <p>Signup for an account today!</p>
          <button type="submit" className="btnHome">Signup</button>
        </div>
      )
    }
  }

  
  export default Home; 
  