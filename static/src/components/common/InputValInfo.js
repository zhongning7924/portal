"use strict";

import classNames from "classnames";

require("styles/fonts/iconfont.css");

var InputValInfo = React.createClass({
  propTypes: {
    status: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      status: {}
    };
  },

  getInitialState() {
    return {
      status: this.props.status
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.status
    });
  },

  render() {
    var status = this.state.status;
    if (status) {
      if (status.error) {
        return (
          <div className="input-val text-danger"><i className="iconfont">&#xe611;</i><span>{status.error}</span></div>
        );
      } else if (status.prompt) {
        return (
          <div className="input-val text-info"><i className="iconfont">&#xe612;</i><span>{status.prompt}</span></div>
        );
      } else if (status.warn) {
        return (
          <div className="input-val text-danger"><i className="iconfont">&#xe612;</i><span>{status.warn}</span></div>
        );
      } else if (status.valid) {
        return (
          <div className="input-val text-success"><i className="iconfont">&#xe613;</i></div>
        );
      }
    }

    return null;
  }
});

module.exports = InputValInfo;
