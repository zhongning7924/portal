"use strict";
/*
 *author ludl3 2015-11-19 10:16
 *修改密码
 */
import Validation, {Validator} from "components/common/form-validation";
import DlgAlert from "../../common/DlgAlert";
import SubmitButton from "./SubmitButton";
import url from "utils/Url";
import regexp from "utils/Regexp";
var SuccessImage = require("images/ok_red_l.png");
var UpdateUserActions = require("actions/UpdateUserActions");
import AuthStore from "stores/AuthStore";
var UpdatePwdStore = require("stores/UpdatePwdStore");
import InputValInfo from "components/common/InputValInfo";
//样式文件
require("styles/less/myaccount.less");
var EditPwd = React.createClass({
  mixins: [Reflux.ListenerMixin, Validation.FieldMixin],
  propTypes: {
    prompts: React.PropTypes.object
  },
  //初始化
  getInitialState() {
    return {
      edit: true,//判断编辑状态
      show: false,//修改密码失败的提示信息显示标识
      pwdMsg: "",//错误提示信息
      userId: AuthStore.getUserId(),
      formStatus: {
        oldpwd: {},
        pwd: {},
        confrimpwd: {}
      },
      formData: {
        oldpwd: undefined,
        pwd: undefined,
        confrimpwd: undefined
      }
    };
  },
  getDefaultProps() {
    return {
      prompts: {
        pwd: "请输入新密码，长度8~16位，数字、字母组合",
        confrimpwd: "请再次输入密码"
      }
    };
  },
  validatePwd(rule, value, callback) {
    if (this.state.formData.confrimpwd) {
      this.refs.validation.forceValidate(["confrimpwd"]);
    }
    callback();
  },

  validateConfrimpwd(rule, value, callback) {
    if (value !== this.state.formData.pwd) {
      callback("请保证2次输入密码相同");
    } else {
      callback();
    }
  },
  //点击提交按钮
  onClickSubmitButton(e) {
    e.preventDefault();

    //提交之前，首先进行表单校验
    this.refs.validation.validate(function(valid) {
      if (valid) {
        var form = e.target.form;
        var submitDatas = {};
        for (var i = 0; i < form.length; i++) {
          //过滤出表单中的button对象
          if (form[i].nodeName === "BUTTON") {
            continue;
          }
          var useName = form[i].name;
          // var useId = form[i].id;
          var useVal = form[i].value;
          submitDatas[useName] = useVal;
         }
        delete submitDatas.confrimpwd;
        //修改密码
        UpdateUserActions.updatePwd.trigger(submitDatas);
      }
      else {
        return;
      }
    });
  },
  //重新登录
  reLogin(e) {
    e.preventDefault();
    url.gotoPage(url.URL.home);
  },
  //修改密码成功
  onUpdatePwdChanged(data) {
    if (data === null || data === "") {
      this.setState({
        edit: false
      });
    }
    else {
      this.setState({
        edit: true,
        show: true,
        pwdMsg: UpdatePwdStore.getPwdMsg()
      });
    }
  },
  init() {
     this.setState({
        show: false
     });
  },
  handleUserIdChange() {
    this.setState({
      userId: AuthStore.getUserId()
    });
  },
  componentDidMount() {
    this.listenTo(UpdatePwdStore, this.onUpdatePwdChanged);
    this.listenTo(AuthStore, this.handleUserIdChange);
  },
  render() {
    var edit = this.state.edit;
    var userId = this.state.userId;
    var formStatus = this.state.formStatus, formData = this.state.formData;
    return (
      <div className="account-subpage-content col-sm-10 col-sm-offset-1">
        <div className="title-line">
          {edit ? (<span>请重设您的账号密码</span>) : (null)}
        </div>
          {edit ? (
            <div className="row">
              <form className="hsy-form form-horizontal col-sm-12">
                <DlgAlert show={this.state.show} content={this.state.pwdMsg} closeCallback={this.init}/>
                <Validation ref="validation" onValidationStateChange={this.onValidationStateChange}>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">原密码</label>
                    <div className="col-sm-4">
                      <Validator require message={{warn: "请输入原密码", prompt: "请输入原密码"}}>
                        <input ref="oldpwd" type="password" name="oldpwd" placeholder="请输入原密码" className="form-control sr"
                        value={formData.oldpwd}/>
                      </Validator>
                    </div>
                    <div className="col-sm-5"><InputValInfo status={formStatus.oldpwd}/></div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">新密码</label>
                    <div className="col-sm-4">
                      <Validator require rules={[{pattern: regexp.pattern.Password, message: this.props.prompts.pwd},
                      {validator: this.validatePwd}]} message={{warn: this.props.prompts.pwd, prompt: this.props.prompts.pwd}}>
                        <input ref="pwd" type="password" name="pwd" placeholder="请输入新密码" className="form-control sr"
                        value={formData.pwd}/>
                      </Validator>
                    </div>
                    <div className="col-sm-5"><InputValInfo status={formStatus.pwd}/></div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">确认密码</label>
                    <div className="col-sm-4">
                      <Validator require rules={{validator: this.validateConfrimpwd}} message={{warn: this.props.prompts.confrimpwd, prompt: this.props.prompts.confrimpwd}}>
                        <input ref="confrimpwd" type="password" name="confrimpwd" placeholder="请输入确认密码" className="form-control sr"
                        value={formData.confrimpwd}/>
                      </Validator>
                    </div>
                    <div className="col-sm-5"><InputValInfo status={formStatus.confrimpwd}/></div>
                  </div>
                  <input type="hidden" id="userid" name="userid" value={userId}/>
                  <SubmitButton edit={edit} onClickSubmitButton={this.onClickSubmitButton}/>
                </Validation>
              </form>
            </div>) :
          (<div className="row"><div className="row text-center hsy-text-red">
            <img src={SuccessImage} alt=""/>
            <span>恭喜您，修改密码成功！</span>
          </div>
          <div className="row text-center">
            <input id="done" type="button" value="重新登录" className="btn btn-danger btn-position" onClick={this.reLogin}/>
          </div></div>)}
      </div>
    );
  }
});
module.exports = EditPwd;
