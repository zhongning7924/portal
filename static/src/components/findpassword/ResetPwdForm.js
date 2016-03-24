"use strict";

import cookie from "js-cookie";
import Validation, {Validator} from "components/common/form-validation";
import RestAPI from "utils/RestAPI";
import regexp from "utils/Regexp";
import InputValInfo from "components/common/InputValInfo";

var Grid = ReactBS.Grid, Row = ReactBS.Row, Col = ReactBS.Col;

var ResetPwdForm = React.createClass({
  mixins: [Validation.FieldMixin],

  propTypes: {
    prompts: React.PropTypes.object,
    account: React.PropTypes.string.isRequired,
    accountType: React.PropTypes.number.isRequired,
    onNextStep: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      prompts: {
        password: "密码必须是8-16位字符和数字混合组成",
        repassword: "请再次输入登录密码"
      }
    };
  },

  getInitialState() {
    return {
      formStatus: {
        password: {},
        repassword: {}
      },
      formData: {
        password: undefined,
        repassword: undefined
      }
    };
  },

  resetPassword() {
    var that = this;
    RestAPI.request({//修改密码并且激活
      url: RestAPI.URL.EMAILUPDATEPWD,
      method: "POST",
      type: "form",
      send: {
        "email": that.props.account,
        "newpwd": this.state.formData.password,
        "gettype": that.props.accountType
      },
      successCallback: function(data){
        if (data === 1) {//程序出错
        } else {//修改密码成功
          that.props.onNextStep("", "");
        }
      },
      errorCallback: function(res) {
      }
    });
  },

  handleClickNext(e) {
    e.preventDefault();
    var that = this;

    // 点击下一步，首先进行表单校验
    this.refs.validation.validate(function(valid){
      if (valid) {
        that.resetPassword();
      }
    });
  },

  validatePassword(rule, value, callback) {
    if (this.state.formData.repassword) {
      this.refs.validation.forceValidate(["repassword"]);
    }
    callback();
  },

  validateRepassword(rule, value, callback) {
    if (value !== this.state.formData.password) {
      callback("请保证2次输入密码相同");
    } else {
      callback();
    }
  },

  render() {
    var formStatus = this.state.formStatus, formData = this.state.formData, prompts = this.props.prompts;
    return (
      <Col md={10} mdOffset={1} className="hsy-subpage-content">
        <form className="form-horizontal reset-pwd col-md-10 col-md-offset-2">
          <Validation ref="validation" onValidationStateChange={this.onValidationStateChange}>
            <div className="form-group">
              <label className="col-sm-3 control-label">设置登录密码</label>
              <Col sm={5}>
                <Validator require rules={[{pattern: regexp.pattern.Password, message: this.props.prompts.password},
                  {validator: this.validatePassword}]}
                  message={{warn: "请输入登录密码", prompt: this.props.prompts.password}}>
                  <input ref="password" type="password" name="password" placeholder="请输入登录密码" className="form-control"
                    value={formData.password}/>
                </Validator>
              </Col>
              <Col sm={4}>
                <InputValInfo status={formStatus.password} />
              </Col>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">再次输入登录密码</label>
              <Col sm={5}>
                <Validator require rules={{validator: this.validateRepassword}}
                  message={{warn: this.props.prompts.repassword, prompt: this.props.prompts.repassword}}>
                  <input ref="repassword" type="password" name="repassword" placeholder="请再次输入登录密码" className="form-control"
                    value={formData.repassword}/>
                </Validator>
              </Col>
              <Col sm={4}>
                <InputValInfo status={formStatus.repassword} />
              </Col>
            </div>
          </Validation>
          <div className="row form-action">
            <Col sm={5} smOffset={3}>
              <input ref="next" type="button" value="确  认" className="hsy-btn btn-info btn-md-width" onClick={this.handleClickNext}/>
            </Col>
          </div>
        </form>
      </Col>
    );
  }
});

module.exports = ResetPwdForm;
