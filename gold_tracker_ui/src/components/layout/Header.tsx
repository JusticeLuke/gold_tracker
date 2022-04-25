import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { logout } from "../../actions/auth"; //Double Check path

export class Header extends Component {
  // static propTypes = {
  //   auth: PropTypes.object.isRequired,
  //   logout: PropTypes.func.isRequired,
  // };
  //replace line 19 with <strong>{user ? `Welcome ${user.username}` : ""}</strong> when the time comes
  render() {
    //const { isAuthenticated, user } = this.props.auth;
    const user = "placeholder";
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            //onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Lead Manager
            </a>
          </div>
          <p>"comment 2 goes here"</p>
        </div>
      </nav>
    );
  }
}
//comment 2: insert: {isAuthenticated ? authLinks : guestLinks} when the time comes
const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

//export default connect(mapStateToProps, { logout })(Header);
export default Header;
