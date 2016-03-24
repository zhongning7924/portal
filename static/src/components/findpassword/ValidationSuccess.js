"use strict";

import cookie from "js-cookie";
import classNames from "classnames";

var Row = ReactBS.Row, Col = ReactBS.Col;

var ValidationSuccess = React.createClass({

  render() {
    return (
      <Col className="hsy-subpage-content pwd-success" md={8} mdOffset={2}>
        <Row>
          <Col className="text-right" xs={2}>
            <i className="iconfont icon-lg text-success">&#xe603;</i>
          </Col>
          <Col className="col-xs-10 reset-sucess">
            <p>重置成功，请牢记新的登录密码<span className="hsy-text-blue-l">{this.props.account}</span>登录</p>
            <a href="/portal/portal/login" className="hsy-text-blue-l">重新登录</a>
          </Col>
        </Row>
      </Col>
    );
  }
});

module.exports = ValidationSuccess;
