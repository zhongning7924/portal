"use strict";
/*
 *author ludl3 2015-11-18 16:00
 *我的账户页
 */
import AccountHead from "./AccountHead";
// import {Nav, Grid, Row, Col, NavItem} from "react-bootstrap";
var pathPrefix = "/page/myaccount/";
var items = [{
  name: "我的账号",
  path: pathPrefix + "account",
  pathName: "accountpage"
  }, {
  name: "修改密码",
  path: pathPrefix + "editpwd",
  pathName: "editpwd"
  }
];
var MyAccount = React.createClass({
  mixins: [Reflux.ListenerMixin],
  render() {
    var navItemNodes = items.map(function (elem, index) {
      var key = "aunav_" + index;
      return <li key={key}><Router.Link to={elem.pathName}>{elem.name}</Router.Link><div className="tri tri-b"></div><div className="tri tri-c"></div></li>;
    });
    return (
     <div className="account-subpage">
       <AccountHead title="惠商账号"/>
       <div className="container account">
         <div>
           <ul className="tab list-inline col-sm-10 col-sm-offset-1">
             {navItemNodes}
           </ul>
         </div>
         <Router.RouteHandler/>
       </div>
     </div>
   );
  }
 });
 module.exports = MyAccount;
