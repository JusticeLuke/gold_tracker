import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import { Header } from "./layout/Header";
import { Dashboard } from "./trackers/Dashboard";
//import PrivateRoute from "./common/PrivateRoute";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="App">
              <Dashboard />
              <Routes>
                <Route path="/register" element={Register} />
                <Route path="/login" element={Login} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
