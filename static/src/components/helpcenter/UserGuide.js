/**
 * 帮助中心－用户指南
 **/
"use strict";

import {Row, Col} from "react-bootstrap";
var items = [{
  name: "用户账号",
  img: require("images/helpcenter/icon_user01.png"),
  title: "介绍惠商云注册、登录、及修改用户信息等相关内容",
  href: "#/page/helpcenter/user/account"
  },
  {
    name: "用户服务协议",
    img: require("images/helpcenter/icon_user02.png"),
    title: "介绍惠商云用户服务协议，使用前必读。",
    href: "#/page/helpcenter/user/agreement"
  }
];

var UserGuide = React.createClass({
  render() {
    var itemNodes = items.map(function (elem) {
      return (
        <Col md={6}>
          <Col md={2}>
            <img src={elem.img}/>
          </Col>
          <Col md={10} className="guide-text">
            <a href={elem.href}>{elem.name}</a>
            <p>{elem.title}</p>
          </Col>
        </Col>
      );
    });
    return (
      <div className="userguide">
        <Row>
          <Col md={12}>
            <h3 className="userguide-title">惠商用户说明</h3>
            <p className="userguide-explain">介绍惠商云用户注册、登录、修改用户信息以及用户服务协议等说明。</p>
            <Row>
             {itemNodes}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = UserGuide;
