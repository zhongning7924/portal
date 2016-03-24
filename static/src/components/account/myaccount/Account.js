"use strict";
/*
 *author ludl3 2015-11-19 09:40
 *我的账户
 */
import AccountTitle from "./AccountTitle";
import AuthStore from "stores/AuthStore";
import ImgUpload from "./ImgUpload";
import CopyAndCreateCode from "./CopyAndCreateCode";
import Validation, {Validator} from "components/common/form-validation";
import SelectComp from "../../pub/SelectComp";
import EditButton from "./EditButton";
import UpdateUserActions from "actions/UpdateUserActions";
import AuthActions from "actions/AuthActions";
import InputValInfo from "components/common/InputValInfo";
import UpdateUserStore from "stores/UpdateUserStore";
import RestAPI from "utils/RestAPI";
import regexp from "utils/Regexp";
//样式文件
require("styles/less/myaccount.less");
var Account = React.createClass({
  mixins: [Reflux.ListenerMixin, Validation.FieldMixin],
  //初始化
  getInitialState() {
    return this.getStateFromAuthStore();
  },

  getStateFromAuthStore() {
    var userinfo = AuthStore.getUserInfo();
    return {
      edit: false,//判断是否为编辑状态
      userInfo: userinfo,
      formStatus: {
        userAccout: {},
        nikename: {},
        userName: {},
        email: {},
        mobile: {},
        carrierName: {},
        storeName: {},
        position: {},
        code: {},
        link: {}
      },
      formData: {
        userAccout: userinfo ? userinfo.userAccout : null,
        nikename: userinfo ? userinfo.nikename : null,
        userName: userinfo ? userinfo.userName : null,
        email: userinfo ? userinfo.email : null,
        mobile: userinfo ? userinfo.mobile : null,
        carrierName: userinfo ? userinfo.carrierName : null,
        storeName: userinfo ? userinfo.storeName : null,
        position: userinfo ? userinfo.position : null,
        code: userinfo ? userinfo.code : null,
        link: userinfo ? userinfo.link : null
      }
    };
  },

  updateUserInfo() {
    var userinfo = this.getUserinfo();
    this.setState({
      formData: {
        userAccout: userinfo.userAccout,
        nikename: userinfo.nikename,
        userName: userinfo.userName,
        email: userinfo.email,
        mobile: userinfo.mobile,
        carrierName: userinfo.carrierName,
        storeName: userinfo.storeName,
        position: userinfo.position,
        code: userinfo.code,
        link: userinfo.link
      }
    });
  },
  getDefaultProps() {
    return {
      prompts: {
        mobile: "手机号格式不对",
        email: "电子邮箱格式不对"
      }
    };
  },
  //校验手机和邮箱的唯一性
  validateEmailMobile(rule, value, callback) {
    var userinfo = this.getUserinfo();
    if (value === userinfo.mobile || value === userinfo.email) {
      callback();
    }
    else {
      RestAPI.request({
        url: RestAPI.URL.VALIDATE_ACCOUNT,
        method: "POST",
        type: "form",
        send: {emailormobile: value},
        successCallback: function(data) {
          callback();
        },
        errorCallback: function(res) {
          if (res && res.body && res.body.flag) {
            callback(new Error(res.body.desc));
          }
        }
      });
    }
  },
  //校验工号的唯一性
  validateCode(rule, value, callback) {
    var userinfo = this.getUserinfo();
    var carrierId = userinfo.carrierId;
    if (value === null || value === "" || value === userinfo.code) {
       callback();
    }
    else {
      RestAPI.request({
        url: RestAPI.URL.VALIDATE_CODE + "/" + carrierId + "/" + value,
        method: "GET",
        type: "form",
        successCallback: function(data) {
          if (data) {
            callback(new Error("工号已存在,请重新输入"));
          }
          else {
            callback();
          }
        },
        errorCallback: function(res) {
          if (res && res.body && res.body.flag) {
            callback(new Error(res.body.desc));
          }
        }
      });
    }
  },
  //点击修改按钮
  onClickEditButton(e) {
    e.preventDefault();
    this.setEditState(true);
  },
  //点击保存按钮
  onClickSaveButton(e) {
    e.preventDefault();
    var form = e.target.form;
    var submitDatas = {};
    //提交之前，首先进行表单校验
    this.refs.validation.validate(function(valid) {
      if (valid) {
        for (var i = 0; i < form.length; i++) {
          var useName = form[i].name;
          // var useId = form[i].id;
          var useVal = form[i].value;
          //过滤出表单中的button对象
          if (form[i].nodeName === "BUTTON" || form[i].name === "") {
            continue;
          }
          if (form[i].name === "userId") {
            useName = form[i].name;
            useVal = parseInt(form[i].value);
          }
          submitDatas[useName] = useVal;
        }
        //修改用户信息
        UpdateUserActions.updateUser.trigger(submitDatas);
      }
      else {
        return;
      }
    });
  },
  //点击取消按钮
  onClickCancleButton(e) {
    e.preventDefault();
    this.updateUserInfo();
    this.setEditState(false);
  },
  //修改编辑的属性
  setEditState(edit) {
    this.setState({
      edit: edit
    });
  },
  //修改用户信息成功
  onUpdateUserChanged(data) {
    AuthActions.getUser();
    if (data === null || data === "") {
      this.setEditState(false);
    }
    else {
      this.updateUserInfo();
    }
  },
  getUserinfo() {
    var userInfo = [];
    if (AuthStore.getUserInfo()) {
      userInfo = AuthStore.getUserInfo();
    }
    return userInfo;
  },
  //当前获取用户信息
  handleUserInfoChange() {
    this.setState(this.getStateFromAuthStore());
  },
  componentDidMount() {
    this.listenTo(UpdateUserStore, this.onUpdateUserChanged);
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },
  render() {
    if (!this.state.userInfo) {
      return null;
    }
    var edit = this.state.edit;
    var options = [{ id: null, value: null}, { id: 1, value: "女"}, {id: 0, value: "男"}];
    var userinfo = this.state.userInfo;
    var individual = false;//判断用户是否为个人账户
    var admin = false;//判断用户是否为系统管理员
    var enterprise = false;//判断用户是否为企业用户
    var carrierId = userinfo.carrierId;
    //carrierId为-2时，是个人账号
    if (carrierId === -2) {
      individual = true;
    }
    //carrierId为-1时，是管理员账号
    else if (carrierId === -1) {
      admin = true;
    }
    else {
      enterprise = true;
    }
    var sex = null;
    if (userinfo.sex === 1) {
      sex = "女";
    }
    else if (userinfo.sex === 0) {
      sex = "男";
    }
    var formStatus = this.state.formStatus, formData = this.state.formData;
    return (
     <div className="account-subpage-content col-sm-10 col-sm-offset-1">
        <AccountTitle individual={individual}/>
        <div className="row">
          <form className="hsy-form form-horizontal col-sm-12">
            <ImgUpload key={userinfo.headportrait}/>
            {this.state.edit ?
            (<Validation ref="validation" onValidationStateChange={this.onValidationStateChange}>
              <input type="hidden" id="userId" name="userId" value={userinfo.userId}/>
              <div className="form-group">
                <label className="col-sm-3 control-label">用户账号：</label>
                <div className="col-sm-4">
                    <input readOnly ref="userAccout" type="text" name="userAccout" className="form-control sr"
                    value={formData.userAccout}/>
                </div>
                <div className="col-sm-5"><InputValInfo status={formStatus.userAccout}/></div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">用户昵称：</label>
                <div className="col-sm-4">
                  <Validator message={{prompt: "请输入用户昵称"}}>
                    <input ref="nikename" type="text" name="nikename" placeholder="请输入用户昵称" className="form-control sr"
                    value={formData.nikename}/>
                  </Validator>
                </div>
                <div className="col-sm-5"><InputValInfo status={formStatus.nikename}/></div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">姓名：</label>
                <div className="col-sm-4">
                  <Validator require message={{warn: "请输入姓名", prompt: "请输入姓名"}}>
                    <input ref="userName" type="text" name="userName" placeholder="请输入姓名" className="form-control sr"
                    value={formData.userName}/>
                  </Validator>
                </div>
                <div className="col-sm-5"><InputValInfo status={formStatus.userName}/></div>
              </div>
              <div className="form-group">
                <SelectComp label="性别：" id="sex" name="sex" edit={edit} options={options} defaultVal={sex} defaultId={userinfo.sex}/>
             </div>
              {userinfo.email ?
                (<div className="form-group">
                  <label className="col-sm-3 control-label">邮箱：</label>
                  <div className="col-sm-4">
                    <input readOnly ref="email" type="text" name="email" placeholder="请输入邮箱" className="form-control sr"
                      value={formData.email}/>
                  </div>
                </div>) :
                (<div className="form-group">
                  <label className="col-sm-3 control-label">邮箱：</label>
                  <div className="col-sm-4">
                    <Validator require message={{warn: "请输入邮箱", prompt: "请输入邮箱"}} rules={[{type: "string",
                    pattern: regexp.pattern.EmailOrTel,
                    message: this.props.prompts.email},
                    {validator: this.validateEmailMobile}]}>
                      <input ref="email" type="text" name="email" placeholder="请输入邮箱" className="form-control sr"
                      value={formData.email}/>
                    </Validator>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.email}/></div>
                </div>)}
              {userinfo.mobile ?
                (<div className="form-group">
                  <label className="col-sm-3 control-label">手机：</label>
                  <div className="col-sm-4">
                      <input readOnly ref="mobile" type="text" name="mobile" placeholder="请输入手机" className="form-control sr"
                      value={formData.mobile}/>
                  </div>
                </div>) :
              (<div className="form-group">
                  <label className="col-sm-3 control-label">手机：</label>
                  <div className="col-sm-4">
                    <Validator require message={{warn: "请输入手机", prompt: "请输入手机"}} rules={[{type: "string",
                    pattern: regexp.pattern.EmailOrTel,
                    message: this.props.prompts.mobile},
                    {validator: this.validateEmailMobile}]}>
                      <input ref="mobile" type="text" name="mobile" placeholder="请输入手机" className="form-control sr"
                      value={formData.mobile}/>
                    </Validator>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.mobile}/></div>
              </div>)}
              {enterprise ?
              (<div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">企业：</label>
                  <div className="col-sm-4">
                      <input readOnly ref="carrierName" type="text" name="carrierName" className="form-control sr"
                      value={formData.carrierName}/>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.carrierName}/></div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">部门：</label>
                  <div className="col-sm-4">
                      <input readOnly ref="storeName" type="text" name="storeName" className="form-control sr"
                      value={formData.storeName}/>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.storeName}/></div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">职务：</label>
                  <div className="col-sm-4">
                    <Validator message={{prompt: "请输入职务"}}>
                      <input ref="position" type="text" name="position" placeholder="请输入职务" className="form-control sr"
                      value={formData.position}/>
                    </Validator>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.position}/></div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">工号：</label>
                  <div className="col-sm-4">
                    <Validator message={{prompt: "请输入工号"}} rules={{validator: this.validateCode}}>
                      <input ref="code" type="text" name="code" placeholder="请输入工号" className="form-control sr"
                      value={formData.code}/>
                    </Validator>
                  </div>
                  <div className="col-sm-5"><InputValInfo status={formStatus.code}/></div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">邀请信息：</label>
                  <div className="col-sm-4">
                      <input readOnly ref="link" type="text" name="link" className="form-control sr"
                      value={formData.link}/>
                  </div>
                  <CopyAndCreateCode value = {userinfo.link}/>
                </div>
              </div>) :
              (null)}
            </Validation>) :
            (<div>
              <div className="form-group">
                  <label className="col-sm-3 control-label">用户账号：</label>
                  <div className="col-sm-4">
                    <span id="userAccout" className="form-control-text" >{formData.userAccout}</span>
                  </div>
              </div>
              <div className="form-group">
                  <label className="col-sm-3 control-label">用户昵称：</label>
                  <div className="col-sm-4">
                    <span id="nikename" className="form-control-text" >{formData.nikename}</span>
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">姓名：</label>
                <div className="col-sm-4">
                  <span id="userName" className="form-control-text" >{formData.userName}</span>
                </div>
              </div>
              <div className="form-group">
                <SelectComp label="性别：" id="sex" name="sex" edit={edit} options={options} defaultVal={sex} defaultId={userinfo.sex}/>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">邮箱：</label>
                <div className="col-sm-4">
                  <span id="email" className="form-control-text" >{formData.email}</span>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">手机：</label>
                <div className="col-sm-4">
                  <span id="mobile" className="form-control-text" >{formData.mobile}</span>
                </div>
              </div>
              {enterprise ?
                (<div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">企业：</label>
                    <div className="col-sm-4">
                      <span id="carrierName" className="form-control-text" >{formData.carrierName}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">部门：</label>
                    <div className="col-sm-4">
                      <span id="storeName" className="form-control-text" >{formData.storeName}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">职务：</label>
                    <div className="col-sm-4">
                      <span id="position" className="form-control-text" >{formData.position}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">工号：</label>
                    <div className="col-sm-4">
                      <span id="code" className="form-control-text" >{formData.code}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">邀请链接：</label>
                    <div className="col-sm-4">
                      <span id="link" className="form-control-text" >{formData.link}</span>
                    </div>
                    <CopyAndCreateCode value = {userinfo.link}/>
                  </div>
                </div>) :
                (null)}
            </div>)}
            <EditButton edit={edit} onClickEditButton={this.onClickEditButton} type="text" onClickSaveButton={this.onClickSaveButton} onClickCancleButton={this.onClickCancleButton}/>
          </form>
        </div>
     </div>
    );
  }
});
module.exports = Account;
