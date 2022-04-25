import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPartys } from "../../actions/TrackerActions";

export class Trackers extends Component {
  componentDidMount() {
    getPartys();
  }
  render() {
    return (
      <div>
        <h2>Partys</h2>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  partys: state.TrackerReducer.partys,
});

export default connect(mapStateToProps, { getPartys })(Trackers);
