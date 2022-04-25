import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  onChange = (e: any) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;
    return (
      <div className="loginForm">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p>
            Need an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}
