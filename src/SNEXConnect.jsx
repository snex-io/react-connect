import React, { Component } from "react";
import PropTypes from "prop-types";

import { PeerConnect } from "./PeerConnect";
import { Widget } from "./Widget";

export class SNEXConnect extends Component {
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
