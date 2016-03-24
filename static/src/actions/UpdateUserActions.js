"use strict";
var RestAPI = require("utils/RestAPI");
var UpdateUserActions = Reflux.createActions({
  "updateUser": {children: ["completed", "failed"] },//修改用户信息
  "updatePwd": {children: ["completed", "failed"] }//修改用户密码
});
UpdateUserActions.updateUser.listen(function(submitDatas) {
  var that = this;
  RestAPI.request({
    url: RestAPI.URL.UPDATEUSER,
    method: "POST",
    send: submitDatas,
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});
UpdateUserActions.updatePwd.listen(function(submitDatas) {
  var that = this;
  RestAPI.request({
    url: RestAPI.URL.UPDATEPWD,
    method: "POST",
    send: submitDatas,
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});
module.exports = UpdateUserActions;
