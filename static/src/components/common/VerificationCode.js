"use strict";

var Row = ReactBS.Row, Col = ReactBS.Col;

var RestAPI = require("utils/RestAPI");

var VerificationCode = React.createClass({
  getInitialState() {
    return {
      timestamp: new Date().getTime()
    };
  },

  getVerificationCodeImgSrc() {
    return RestAPI.URL.GET_VERICODEIMG + "?_=" + this.state.timestamp;
  },

  changeCode() {
    this.setState({
      timestamp: new Date().getTime()
    });
  },

  handleChangeCode(e) {
    e.preventDefault();

    this.changeCode();
  },

  render() {
    return (
      <Row>
        <Col xs={6}>
          <a href="javascript:void(0)" onClick={this.handleChangeCode}>
          <img ref="veriCodeImg" src={this.getVerificationCodeImgSrc()}/>
        </a>
        </Col>
        <Col xs={6}>
          <span>看不清?</span><a href="javascript:void(0)" onClick={this.handleChangeCode}>换一张</a>
        </Col>
      </Row>
    );
  }
});

module.exports = VerificationCode;
