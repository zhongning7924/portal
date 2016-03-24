"use strict";

import cookie from "js-cookie";
import Validation, {Validator} from "components/common/form-validation";
import RestAPI from "utils/RestAPI";
import regexp from "utils/Regexp";
import InputValInfo from "components/common/InputValInfo";
import GetCaptchaBtn from "./GetCaptchaBtn";
require("styles/less/myaccount.less");
var Grid = ReactBS.Grid, Row = ReactBS.Row, Col = ReactBS.Col;
var accountType = null;
var GetCaptchaForm = React.createClass({
  mixins: [Validation.FieldMixin],
  propTypes: {
    prompts: React.PropTypes.object,
    onNextStep: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      prompts: {
        account: "请输入有效电子邮箱/手机号",
        captcha: "请输入验证码"
      }
    };
  },

  getInitialState() {
    return {
      formStatus: {
        account: {},
        captcha: {}
      },
      formData: {
        account: this.props.account,
        captcha: undefined
      }
    };
  },

  handleClickNext(e) {
    e.preventDefault();
    var that = this;
    // 点击下一步，首先进行表单校验
    this.refs.validation.validate(function(valid) {
      if (valid) {
       that.props.onNextStep(that.state.formData.account, accountType);
      }
    });
  },

  getCaptcha(successCallback, errorCallback) {
    var that = this;
    var isEamil = regexp.isEmail(that.state.formData.account);
    // var isTel = regexp.pattern.isTel(that.state.formData.account);
    accountType = isEamil === "true" ? "1" : "2";
    function _getCaptcha() {
      RestAPI.request({
        //获取邮箱/手机验证码
        url: RestAPI.URL.GET_CAPTCHA,
        method: "POST",
        type: "form",
        send: {"email": that.state.formData.account, "gettype": accountType},
        successCallback: function(data) {
          if (_.isFunction(successCallback)) {
            successCallback(data);
          }
        },
        errorCallback: function(res) {
          if (_.isFunction(errorCallback)) {
            errorCallback(res);
          }
        }
      });
    }
    // 账户已通过校验，直接获取验证码
    if (this.state.formStatus.account.valid) {
      _getCaptcha();
      return;
    }
    // 否则先校验账户,valid为全局表单状态
    this.refs.validation.forceValidate(["account"], function(valid) {
      if (that.state.formStatus.account.valid) {
        _getCaptcha();
      }
    });

  },
  //点击下一步校验验证码
  validateCaptcha(rule, value, callback) {
    var that = this;
    RestAPI.request({
      url: RestAPI.URL.VALIDATE_CAPTCHA,
      method: "POST",
      type: "form",
      send: {emailormobile: that.state.formData.account, captcha: value},
      successCallback: function(data) {
        callback();
      },
      errorCallback: function(res) {
        if (res && res.body && res.body.flag) {
          callback(new Error(res.body.desc));
        }
      }
    });
  },
 //校验手机和邮箱的唯一性
  validateEmailMobile: function(rule, value, callback) {
    RestAPI.request({
      url: RestAPI.URL.VALIDATE_ACCOUNT,
      method: "POST",
      type: "form",
      send: {emailormobile: this.state.formData.account},
      successCallback: function(data) {
        callback(new Error("邮箱/手机号未注册"));
      },
      errorCallback: function(res) {
        if (res && res.body && res.body.flag) {
          callback();
        }
      }
    });
  },
  render() {
    var formStatus = this.state.formStatus, formData = this.state.formData, prompts = this.props.prompts;
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1} className="hsy-subpage-content container">
            <div className="title-line"></div>
            <Col md={10} mdOffset={2} className="form-horizontal-line">
              <form className="form-horizontal ">
                <Validation ref="validation" onValidationStateChange={this.onValidationStateChange}>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">邮箱/手机号</label>
                    <Col sm={5}>
                      <Validator require rules={[{type: "string",
                        pattern: regexp.pattern.EmailOrTel,
                        message: "请输入有效电子邮箱/手机号"},
                        {validator: this.validateEmailMobile}]}
                        message={{warn: this.props.prompts.account, prompt: this.props.prompts.account}}>
                        <input ref="account" name="account" placeholder="请输入邮箱/手机号" className="form-control"
                          value={formData.account}/>
                      </Validator>
                    </Col>
                    <Col sm={4}>
                      <InputValInfo status={formStatus.account} />
                    </Col>
                  </div>
                  <div className="form-group">
                    <Col sm={5} smOffset={3}>
                      <GetCaptchaBtn onGetCaptcha={this.getCaptcha}/>
                    </Col>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">验证码</label>
                    <Col sm={5}>
                      <Validator require rules={{validator: this.validateCaptcha}} message={{warn: this.props.prompts.captcha, prompt: this.props.prompts.captcha}}>
                        <input ref="captcha" name="captcha" placeholder="请输入收到的验证码" className="form-control"
                          value={formData.captcha}/>
                      </Validator>
                    </Col>
                    <Col sm={4}>
                      <InputValInfo status={formStatus.captcha} />
                    </Col>
                  </div>
                </Validation>
                <div className="form-group">
                  <Col sm={5} smOffset={3}>
                    <div className="form-tip">如果一段时间未收到，请重新获取</div>
                  </Col>
                </div>
                <div className="row form-action">
                  <Col sm={5} smOffset={3}>
                    <input ref="next" type="button" value="下一步" className="hsy-btn btn-info btn-md-width" onClick={this.handleClickNext}/>
                  </Col>
                </div>
              </form>
            </Col>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = GetCaptchaForm;
