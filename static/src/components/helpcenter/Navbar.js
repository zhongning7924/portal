/**
 * 帮助中心导航栏组件
 **/
"use strict";

import {Navbar, Nav, NavItem} from "react-bootstrap";
//import {NavItemLink} from "react-router-bootstrap";
import url from "utils/Url";
import routeConfig from "./RouteConfig";

require("styles/less/navbar.less");
var logoImg = require("images/logo_helpcenter.png");

var navItems = [
  routeConfig.user,
  routeConfig.finance,
  routeConfig.service
];

var Navibar = React.createClass({
  render() {
    var navItemNodes = navItems.map(function(elem, index) {
      var key = "hcnav_" + index;
      return <NavItem key={key} eventKey={index + 1} href={"/portal/#" + elem.path}>{elem.name}</NavItem>;
    });

    return (
      <Navbar className="hsy-hc-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href={url.URL.helpCenter}><img src={logoImg} alt="惠商帮助中心"/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav navbar left>
            {navItemNodes}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = Navibar;
