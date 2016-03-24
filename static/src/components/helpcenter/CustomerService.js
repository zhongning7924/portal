/**
 * 帮助中心－联系客服
 **/
"use strict";
import {Grid, Row, Col} from "react-bootstrap";
var items = [{
  img: require("images/helpcenter/icon_service01.png"),
  title1: "在线客服",
  title2: "在线客服提供网络在线咨询、离线留言和智能机器人自动应答服务。",
  title3: "实时反馈，7*24小时在线咨询",
  title4: "请点击首页右下侧\"在线客服\"图标获取帮助"
},
{
  img: require("images/helpcenter/icon_service02.png"),
  title1: "论坛帮助",
  title2: "惠商云社区——集结大量咨询顾问和热心会员，免费给予问题解答和指导。",
  title3: "实时反馈",
  title4: "进入社区"
},
{
  img: require("images/helpcenter/icon_service03.png"),
  title1: "电话咨询",
  title2: "人工热线电话服务，有时需要等待时间。",
  title3: "工作时间实时反馈，如遇坐席忙请耐心等待。",
  title4: "咨询电话：010-62439981，电子邮箱：supportmcloud@yonyou.com"
}
];

var CustomerService = React.createClass({
  render() {
    var itemNodes = items.map(function (elem, index) {
      return (
        <Col md={6}>
          <Col md={2}>
            <img src={elem.img}/>
          </Col>
          <Col md={10}>
            <p>{elem.title1}</p>
            <p>{elem.title2}</p>
            <p>{elem.title3}</p>
            {index === 1 ? <p><a href="http://bbs.hsclouds.com/dz/login.jsp" target="_blank">{elem.title4}</a></p> : <p>{elem.title4}</p>}
          </Col>
        </Col>
      );
    });
    return (
      <Col className="customerservice">
        <Grid className="customerservice-content">
          <h3>联系客服</h3>
          <p>提供多种客户咨询服务渠道，在线服务、热线电话、论坛咨询等。</p>
          {itemNodes}
        </Grid>
      </Col>
    );
  }
});

module.exports = CustomerService;
