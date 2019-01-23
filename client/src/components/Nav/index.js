import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
    <img className="logo" src={'../keychainLogo.png'} />
      <Link className="navbar-brand" to="/">
        Keychain
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link navbar-brand" to="/searchOne">User Directory<span class="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-brand" to="/authenticate">Friends</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle navbar-brand" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Account Options
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/keys">Your Keys</Link>
              <Link className="dropdown-item" to="/account">Edit Account</Link>
              <Link className="dropdown-item" to="/signup">Signup</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
