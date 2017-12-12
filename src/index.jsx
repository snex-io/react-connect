import React, { Component } from "react";
import PropTypes from "prop-types";

import SNEX from "snex";

import PeerConnector from "./PeerConnector";
import Widget from "./Widget";

class SNEXConnect extends Component {
  static propTypes = {
    onConnection: PropTypes.func.isRequired,
    type: PropTypes.string,
  };

  render() {
    return (
      <PeerConnector
        onConnection={this.props.onConnection}
        type={this.props.type}
      >
        <Widget/>
      </PeerConnector>
    );
  }
}

export default SNEXConnect;
