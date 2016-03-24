/**
 * 导航栏组件
 **/
"use strict";

import {Navbar, NavBrand, CollapsibleNav, Nav} from "react-bootstrap";
import HSNavItem from "./HSNavItem";
import url from "utils/Url";
import SubNavbarProduct from "./SubNavbarProduct";
import SubNavbarHelpcenter from "./SubNavbarHelpcenter";
import AuthStore from "stores/AuthStore";
import LinkItemConfig from "components/common/LinkItemConfig";

require("styles/less/navbar.less");
var logoImg = require("images/logo.png");
var voidHref = "javascript:void(0);";

function getNavItems() {
  var linkItems = LinkItemConfig.getLinkItems();
  return [
  {
    name: "产品与服务",
    aHref: voidHref,
    aTarget: "",
    children: <SubNavbarProduct/>,
    className: "product"
  },
  {
    name: "体验中心",
    aHref: url.URL.expCenter,
    aTarget: "_blank"
  },
    linkItems.api,
  {
    name: "帮助与支持",
    aHref: voidHref,
    aTarget: "",
    children: <SubNavbarHelpcenter/>,
    className: "helpcenter"
  },
    linkItems.bbs
  ];
}

var Navibar = React.createClass({
  propTypes: {
    home: React.PropTypes.bool.isRequired
  },

  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      userInfo: null,
      navItems: getNavItems()
    };
  },

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  handleUserInfoChange() {
    this.setState({
      navItems: getNavItems()
    });
  },

  getDefaultProps() {
    return {
      home: false
    };
  },

  render() {
    var navItemNodes = this.state.navItems.map(function(elem, index) {
      var key = "navi_" + index;
      return (
        <HSNavItem
          key={key}
          eventKey={index + 1}
          href={elem.aHref}
          target={elem.aTarget}
          className={elem.className}
          subNav={elem.children}>
            {elem.name}
        </HSNavItem>
      );
    });

    return (
      <Navbar className="hsy-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <Router.Link to={"/"}><img src={logoImg} alt="惠商"/></Router.Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav navbar pullRight>
            {navItemNodes}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports = Navibar;
