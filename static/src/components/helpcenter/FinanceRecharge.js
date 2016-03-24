/**
 * 帮助中心－财务问题－充值说明
 **/
"use strict";

import {Row, Col} from "react-bootstrap";

var FinanceRecharge = React.createClass({
  render() {
    var img1 = require("images/helpcenter/recharge01.png");
    var img2 = require("images/helpcenter/recharge02.png");
    return (
      <Row>
        <Col md={12}>
        <div className="financerecharge">
          <h3>充值说明</h3>
          <p className="change">1 充值方式</p>
          <p>企业在正式签订惠商云应用服务购买合同之后，将由惠商系统管理员在运营管理平台开通该企业已购买的应用服务并为企业充值，根据合同设定购买人数和购买时间。企业管理员在充值成功之后，可登录运营管理平台查看每个应用的充值和消费记录。</p>
          <p className="change">2 查看充值记录</p>
          <p>企业管理员登录运营平台后，在“运营授权”菜单下的“充值/退订”菜单中查看企业已购买应用的充值和消费情况。</p>
          <img className="change" src={img1}/>
          <p className="change">点击上图所示某个应用余量信息的“明细”操作按钮，可查看该企业购买应用的消费和余量详情。</p>
          <img className="bootomchange" src={img2}/>
        </div>
        </Col>
      </Row>
    );
  }
});

module.exports = FinanceRecharge;
