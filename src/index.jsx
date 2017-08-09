import React, { Component } from "react";
import PropTypes from "prop-types";
import SNEX from "snex";

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

        this.timer = setTimeout(() => {
          this.setState({
            link: null,
          });
        }, timeout);
      });
  }

  render() {
    const { link } = this.state;
    const url = link ? link.url : null;

    return (
      <div
        className="snex-connect"
        style={{
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
            background: `url('https://cdn.snex.io/images/snex-logo.svg') center no-repeat`,
            backgroundSize: "contain",
            cursor: "pointer",
            position: "absolute",
            height: "100%",
            transform: "rotateX(0deg)",
            width: "100%",
          }}
          onClick={() => this.activate()}
        />

        <div
          className="back"
          style={{
            alignItems: "center",
            backfaceVisibility: "hidden",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            position: "absolute",
            transform: "rotateX(180deg)",
            height: "100%",
            width: "100%",
          }}
        >
          <div>
            <small>Remote Control</small>
          </div>
          <div>
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
