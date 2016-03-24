"use strict";

var UpdateUserActions = require("actions/UpdateUserActions");
var pwdData = [];
var pwdMsg = null;
var UpdatePwdStore = Reflux.createStore({
  init: function() {
    this.listenTo(UpdateUserActions.updatePwd.completed, this.onUpdatePwdCompleted);
    this.listenTo(UpdateUserActions.updatePwd.failed, this.onUpdatePwdFailed);
  },
  //保存成功
  onUpdatePwdCompleted: function(ret) {
    this.updateSavePwd(ret);
  },
  //保存失败
  onUpdatePwdFailed: function(ret) {
    if (ret) {
      //把字符串转为对象
      ret = eval("(" + ret.text + ")");
      this.updatePwdMsg(ret.desc);
    }
  },
  updateSavePwd: function(ret) {
    pwdData = ret;
    this.trigger(pwdData); // 向监听组件发送更新的数据
  },
  updatePwdMsg: function(ret) {
    pwdMsg = ret;
    this.trigger(pwdMsg);

  },
  //获取修改用户密码信息
  getSavePwdData: function() {
    return pwdData;
  },
  //获取保存失败的提示信息
  getPwdMsg: function() {
    return pwdMsg;
  },
  getInitialState: function() {

    return pwdData;
  }

});

module.exports = UpdatePwdStore;
