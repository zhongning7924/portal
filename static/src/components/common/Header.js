"use strict";

import {Grid, Row, Col, DropdownButton, MenuItem} from "react-bootstrap";
import AuthActions from "actions/AuthActions";
import AuthStore from "stores/AuthStore";
import url from "utils/Url";

require("styles/less/header.less");

var Header = React.createClass({
  mixins: [Reflux.ListenerMixin],

  propTypes: {
    home: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    var initState = {
      loading: AuthStore.isLoading(),
      userInfo: AuthStore.getUserInfo()
    };
    return initState;
  },

  getDefaultProps() {
    return {
      home: false
    };
  },

  handleUserInfoChange() {
    this.setState({
      loading: AuthStore.isLoading(),
      userInfo: AuthStore.getUserInfo()
    });
  },

  handleLogout() {
    this.setState({
      loading: true
    });
    AuthActions.logout();
  },

  handleDropdownSelect(event, eventKey) {
    switch (eventKey) {
      case "1":
        url.gotoPage(url.URL.myAccount);
        break;
      case "2":
        url.gotoPage(url.URL.backendManage);
        break;
      case "3":
        this.handleLogout();
        break;
    }
  },

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  render() {
    var returnNode = null; // 左侧返回首页节点
    if (!this.props.home) { // 首页不显示
      returnNode = <Router.Link to={"/"}>返回首页</Router.Link>;
    }

    var userOperNode = null; // 用户操作节点
    if (!this.state.loading) {
      if (this.state.userInfo) { // 已登录用户
        userOperNode = (
          <div className="logged-user">
            用友惠商云平台欢迎您
            <DropdownButton id={"headerDropdown1"} title={this.state.userInfo.userName} bsStyle="link" pullRight onSelect={this.handleDropdownSelect}>
              <MenuItem eventKey="1">我的账户</MenuItem>
              <MenuItem eventKey="2">后台管理</MenuItem>
              <MenuItem eventKey="3">退出</MenuItem>
            </DropdownButton>
          </div>
        );
      } else {  // 未登录用户
        userOperNode = (
          <ul className="visitor pull-right list-inline">
            <li className="hsy-login"><a href={url.getLoginToCurUrl()}>登录</a></li>
            <li className="hsy-register"><a href={url.URL.register}>注册</a></li>
          </ul>
        );
      }
    }

    return (
      <Grid className="hsy-header" fluid>
        <Grid>
            {this.state.loading ? null : (
              <Row>
                <Col xs={6} className="text-left">{returnNode}</Col>
                <Col xs={6} className="text-right">{userOperNode}</Col>
              </Row>
            )}
        </Grid>
      </Grid>
    );
  }
});

module.exports = Header;
