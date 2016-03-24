"use strict";

import {Grid, Row, Col} from "react-bootstrap";

var titleImg = require("images/home/title_platform.jpg");
var bgImg = require("images/home/bg_platform.jpg");

var items = [{
  name: "开放平台",
  img: require("images/home/line_kfpt.png"),
  introText: "开放API，支持应用伙伴接入，构建企业移动和云服务生态链 开放的渠道伙伴，惠商云提供专业的服务能力"
}, {
  name: "分布式架构",
  img: require("images/home/line_fbsjg.png"),
  introText: "硬件、存储、数据库、中间件、缓存、搜索支持开源分布式架构，实现高可用和动态扩展"
}, {
  name: "大数据支撑",
  img: require("images/home/line_dsjzc.png"),
  introText: "引入开源实时大数据计算框架, 支撑实时及离线大数据建模和分析"
}, {
  name: "持续集成",
  img: require("images/home/line_cxjc.png"),
  introText: "实现平台服务能力快速迭代发布，支持伙伴应用的快速集成接入，7×24小时服务支持"
}];

const Platform = React.createClass({
  render() {
    var itemNodes = items.map(function(elem, index) {
      return (
        <Col key={"pf_" + index} md={3} sm={6} xs={6} className="cell-platform">
          <img className="img-responsive center-block" src={elem.img} alt={elem.name}/>
          <p className="title">{elem.name}</p>
          <p className="intro">{elem.introText}</p>
        </Col>
      );
    });

    return (
      <Grid fluid className="platform">
        <img className="bg-platform img-responsive visible-md visible-lg" src={bgImg} alt=""/>
        <Grid>
          <Row>
            <Col sm={12} className="title-platform">
              <img src={titleImg} alt="一站式服务平台" className="img-responsive center-block"/>
            </Col>
          </Row>
          <Row>{itemNodes}</Row>
        </Grid>
      </Grid>
    );
  }
});

module.exports = Platform;
