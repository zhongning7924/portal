"use strict";

import cookie from "js-cookie";
var Grid = ReactBS.Grid, Row = ReactBS.Row, Col = ReactBS.Col;
var GetCaptchaForm = require("./GetCaptchaForm");
var ResetPwdForm = require("./ResetPwdForm");
import Footer from "components/common/Footer";
var ValidationSuccess = require("./ValidationSuccess");
import AccountHead from "components/account/myaccount/AccountHead";
var _account = null;
var _accountType = null;
var Forgetpwd = React.createClass({
  mixins: [Router.Navigation, Router.State],

  getInitialState() {
    return {
      step: 1
    };
  },

  componentWillMount() {
    // document.title = "惠商-找回密码";
  },

  handleNextStep(account, accountType) {
     if (this.state.step === 1) {
      _account = account;
      _accountType = accountType;
    }
    // 下一步
    this.setState({
      step: this.state.step + 1
    });


  },

  render() {
    var child = null;
    switch (this.state.step) {
      case 1:
        child = <GetCaptchaForm onNextStep={this.handleNextStep}/>;
        break;
      case 2:
        child = <ResetPwdForm account={_account} accountType={_accountType} onNextStep={this.handleNextStep}/>;
        break;
      case 3:
        child = <ValidationSuccess account={this.props.account}/>;
        break;
    }

    return (
      <Col>
        <AccountHead title="找回密码"/>
        <Grid>
          {child}
        </Grid>
      </Col>
    );
  }
});

module.exports = Forgetpwd;
