import React, { Component } from "react";
import PropTypes from "prop-types";

import SNEX from "snex";

import PeerConnect from "./PeerConnect";
import Widget from "./Widget";

export { PeerConnect };

export default class SNEXConnect extends Component {
  static propTypes = {
    onConnection: PropTypes.func.isRequired,
    type: PropTypes.string,
  };

  render() {
    return (
      <PeerConnect
        onConnection={this.props.onConnection}
        type={this.props.type}
      >
        <Widget />
      </PeerConnect>
    );
  }
}
