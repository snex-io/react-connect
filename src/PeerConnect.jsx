import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import SNEX from "snex";

const MILLIS = 1000;
const GRACE = 30;

class PeerConnector extends Component {
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
      link: null,
    };
  }

  componentWillUnmount() {
    this.destroy();
  }

  componentWillReceiveProps;

  activate = () => {
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
      this.session
        .then(session => {
          session.on("connection", this.props.onConnection);
          session.on("disconnected", this.destroy);
        })
        .catch(e => {
          console.error(e);
          this.destroy();
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
  };

  sleep = () => {
    this.setState({
      busy: false,
      link: null,
    });
  };

  destroy = () => {
    clearTimeout(this.timer);

    this.sleep();

    if (this.session) {
      this.session.then(session => {
        session.removeListener("connection", this.props.onConnection);
        session.removeListener("disconnected", this.destroy);
      });
      this.session = null;
    }
  };

  render() {
    const { busy, link } = this.state;
    const url = link ? link.url : null;

    return (
      <div className="snex-react-connect" onClick={this.activate}>
        {cloneElement(React.Children.only(this.props.children), { busy, url })}
      </div>
    );
  }
}

export default PeerConnector;
