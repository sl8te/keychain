import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signup from "./pages/signup/Signup";
import Account from "./pages/account/Account";
import Keys from "./pages/keys/Keys";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          {/* <Route exact path="/books" component={Books} /> */}
          <Route exact path="/books/:id" component={Detail} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/keys" component={Keys} />
          <Route exact path="/login" component={Login} />
          <Route component={NoMatch} />
          {/* <Route exact path="/account" component={Account} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={Search} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
