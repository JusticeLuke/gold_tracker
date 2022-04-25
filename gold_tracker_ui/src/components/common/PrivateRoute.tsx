import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

interface MyProps {
  component: Component;
  path: string;
  element: any;
}

// const PrivateRoute = ({ component, auth, path, element }: MyProps) => (
//   <Route
//     path={path}
//     {...(element: any) => {
//       if (auth.isLoading) {
//         return <h2>Loading...</h2>;
//       } else if (!auth.isAuthenticated) {
//         return <Navigate to="/login" />;
//       } else {
//         return <Component {...element} />;
//       }
//     }}
//   />
// );

// const mapStateToProps = (state: any) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);
