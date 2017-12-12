import React, { Component } from "react";
import PropTypes from "prop-types";
import SNEX from "snex";

import logo from "./logo.svg";
import throbber from "./throbber.svg";

const MILLIS = 1000;
const GRACE = 30;

class SNEXConnect extends Component {
  static propTypes = {
    onConnection: PropTypes.func.isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: "nes",
  };

  constructor(props) {
    super(props);

    this.activating = false;
    this.session = null;
    this.timer = null;

    this.state = {
      busy: false,
    };

    this.activate = this.activate.bind(this);
    this.sleep = this.sleep.bind(this);
  }

  activate() {
    if (this.activating) {
      return;
    }

    this.activating = true;
    this.setState({
      busy: true,
      link: null,
    });

    if (!this.session) {
      this.session = SNEX.createSession();
      this.session.then(session => {
        session.on("connection", this.props.onConnection);
        session.on("disconnected", this.sleep);
      });
    }

    clearTimeout(this.timer);

    this.session
      .then(session => {
        return session.createURL(this.props.type);
      })
      .then(link => {
        this.activating = false;
        this.setState({
          link,
          busy: false,
        });

        const timeout = (link.lifeTime - GRACE) * MILLIS;
        console.info(`SNEX link timeout in ${timeout}ms`);

        this.timer = setTimeout(this.sleep, timeout);
      });
  }

  sleep() {
    this.session = null;
    this.setState({
      busy: false,
      link: null,
    });
  }

  render() {
    const { busy, link } = this.state;
    const url = link ? link.url : null;

    return (
      <div
        className="snex-react-connect"
        style={{
          height: "5em",
          position: "relative",
          transform: link ? "rotateX(180deg)" : "rotateX(0deg)",
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
            onClick={this.activate}
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

export default SNEXConnect;
