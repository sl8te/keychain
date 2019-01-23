import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signup from "./pages/signup/Signup";
import Account from "./pages/account/Account";
import Keys from "./pages/keys/Keys";
import Login from "./pages/login/Login";
import Authenticate from "./pages/authenticate/authenticate";
import Home from "./pages/home/Home";
import FriendsList from "./pages/friends/Friends";
import View from "./pages/view/View";
import SearchOne from "./pages/searchOne/SearchOne";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/keys" component={Keys} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/authenticate" component={Authenticate} />
          <Route exact path="/friends" component={FriendsList}/>
          {/* <Route exact path="/view" component={View} /> */}
          <Route exact path="/searchOne" component={SearchOne} />
          <Route exact path="/view/:id" component={View} />
          {/* <Route exact path="/friends" component={Friends} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;