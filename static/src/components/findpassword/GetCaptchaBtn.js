"use strict";

import classNames from "classnames";

var GetCaptchaBtn = React.createClass({
  propTypes: {
    /* 下一次获取验证码倒计时时间 */
    countDownSec: React.PropTypes.number.isRequired,
    onGetCaptcha: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      countDownSec: 60,
      onGetCaptcha: function () {}
    }
  },

  getInitialState() {
    return {
      label: "获取验证码",
      disabled: false
    }
  },

  _countDown(countDownSec) {
    var that = this;

    function countDown(val) {
      if (val === 0) {
        that.setState({
          disabled: false,
          label: "获取验证码"
        });
      } else {
        that.setState({
          disabled: true,
          label: val + "秒后重新获取"
        });
        val--;
        setTimeout(function() {
          countDown(val);
        }, 1000);
      }
    }
    countDown(countDownSec);
  },

  handleGetCaptcha(e) {
    e.preventDefault();
    if (this.state.disabled) {
      return;
    }
    var that = this;
    this.props.onGetCaptcha(function(data){
      that._countDown(that.props.countDownSec);
    });
  },

  render() {
    var btnClassName = classNames([
      "hsy-btn",
      {"btn-warning": !this.state.disabled},
      {"btn-disabled": this.state.disabled}
    ]);
    return (
      <input ref="getcaptcha"
        type="button"
        disabled={this.state.disabled}
        value={this.state.label}
        className={btnClassName}
        onClick={this.handleGetCaptcha}/>
    );
  }
});

module.exports = GetCaptchaBtn;
