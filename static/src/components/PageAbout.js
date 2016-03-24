"use strict";

import Navbar from "./common/Navbar";
import {Nav, Grid, Row, Col, NavItem} from "react-bootstrap";
require("styles/less/navbar.less");
require("styles/less/about.less");
//import {NavItemLink} from "react-router-bootstrap";
var pathPrefix = "/page/about/";
var items = [{
  name: "关于我们",
  path: pathPrefix + "aboutus",
  pathName: "auaboutus",
  icon: "iconfont icon-guanyuwomen"
  }, {
  name: "法律声明",
  path: pathPrefix + "declaration",
  pathName: "audeclaration",
  icon: "iconfont icon-falvshengming"
  }, {
    name: "服务公告",
    path: pathPrefix + "notice",
    pathName: "aunotice",
    icon: "iconfont icon-gonggao"
  }, {
    name: "联系我们",
    path: pathPrefix + "contactus",
    pathName: "aucontactus",
    icon: "iconfont icon-icon2"
  }
];
var PageAbout = React.createClass({
  render() {
    var navItemNodes = items.map(function (elem, index) {
      var key = "aunav_" + index;
      var icon = <i className={elem.icon}></i>;
      return <li key={key}><Router.Link to={elem.pathName}>{icon}{elem.name}</Router.Link></li>;
    });
    return (
      <div className="hsy-about">
         <Navbar/>
         <Grid className="about-content">
           <Col md={2} xs={3} className="about-content-left">
            <ul className="text-center about-ul-nav">
              {navItemNodes}
            </ul>
           </Col>
          <div className="au-content">
            <Col md={10} xs={9} className="about-content-right">
              <Router.RouteHandler/>
            </Col>
          </div>
        </Grid>
      </div>
    );
  }
});

module.exports = PageAbout;
