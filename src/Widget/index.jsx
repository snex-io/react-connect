import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";

import logo from "./logo.svg";
import throbber from "./throbber.svg";

class Widget extends Component {
  static propTypes = {
    busy: PropTypes.bool,
    url: PropTypes.string,
  };

  render() {
    const { busy, url } = this.props;

    return (
      <div
        className="snex-react-connect-widget"
        style={{
          height: "5em",
          position: "relative",
          transform: url ? "rotateX(180deg)" : "rotateX(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 1s ease",
        }}
      >
        <div
          className="front"
          style={{
            backfaceVisibility: "hidden",
            height: "100%",
            position: "relative",
            transform: "rotateX(0deg)",
            width: "100%",
          }}
        >
          <div
            className="logo"
            style={{
              background: `url(${logo}) center no-repeat`,
              backgroundSize: "contain",
              cursor: "pointer",
              height: "100%",
              opacity: busy ? 0.4 : 1,
              position: "absolute",
              transition: "opacity 0.3s ease",
              width: "100%",
            }}
          />
          <div
            className="throbber"
            style={{
              background: `url(${throbber}) center no-repeat`,
              display: busy ? "block" : "none",
              backgroundSize: "contain",
              height: "100%",
              position: "absolute",
              width: "100%",
            }}
          />
        </div>

        <div
          className="back"
          style={{
            alignItems: "center",
            backfaceVisibility: "hidden",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            position: "absolute",
            textAlign: "center",
            transform: "rotateX(180deg)",
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <div className="caption">Remote Control</div>
          <div className="link">
            <a href={url} target="_blank">
              {url}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Widget;
