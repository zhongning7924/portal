"use strict";

var UpdateUserActions = require("actions/UpdateUserActions");
var userData = [];
var pwdData = [];
var UpdateUserStore = Reflux.createStore({
  init: function() {
    this.listenTo(UpdateUserActions.updateUser.completed, this.onUpdateUserCompleted);
    this.listenTo(UpdateUserActions.updateUser.failed, this.onUpdateUserFailed);
  },
  //保存成功
  onUpdateUserCompleted: function(ret) {
    this.updateSaveUser(ret);
  },
  updateSaveUser: function(ret) {
      userData = ret;
      this.trigger(userData); // 向监听组件发送更新的数据
  },
  //获取修改用户信息
  getSaveUserData: function() {
    return userData;
  },
  getInitialState: function() {

    return userData;
  }
});

module.exports = UpdateUserStore;
