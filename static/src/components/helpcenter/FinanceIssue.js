/**
 * 帮助中心－财务问题
 **/
"use strict";

import {Row, Col} from "react-bootstrap";
var items = [{
  name: "计费说明",
  img: require("images/helpcenter/icon_finance01.png"),
  title: "总述惠商云提供的应用服务产品的计费方式。",
  href: "#/page/helpcenter/finance/billing"
  },
  {
    name: "充值说明",
    img: require("images/helpcenter/icon_finance02.png"),
    title: "介绍如何为账户充值、充值方式以及查看充值记录等。",
    href: "#/page/helpcenter/finance/recharge"
  },
  {
    name: "运营服务合同",
    img: require("images/helpcenter/icon_finance03.png"),
    title: "总述惠商云提供的应用服务产品的运营服务合同示例。",
    href: "#/page/helpcenter/finance/agreement"
  }
];

var FinanceIssue = React.createClass({
  render() {
     var itemNodes = items.map(function (elem) {
      return (
        <Col md={6}>
          <Col md={2}>
            <img src={elem.img}/>
          </Col>
          <Col md={10} className="financeissue-text">
            <a href={elem.href}>{elem.name}</a>
            <p>{elem.title}</p>
          </Col>
        </Col>
      );
    });
    return (
      <Row>
        <Col md={12}>
          <p className="explain-text">提供购买应用的计费方式、账户充值方式、运营服务合同说明等。</p>
          <div className="finance-content">
            {itemNodes}
          </div>
        </Col>
      </Row>
    );
  }
});

module.exports = FinanceIssue;
