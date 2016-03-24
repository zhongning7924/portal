"use strict";

var RestAPI = require("utils/RestAPI");

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

var AuthActions = Reflux.createActions({
  "getUser": {children: ["completed", "failed"] }, // 获取登录用户的信息
  "logout": "logout" // 用户登出
});

AuthActions.getUser.listen(function() {
  var that = this;

  RestAPI.request({
    url: RestAPI.URL.GET_USERINFO,
    method: "GET",
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});

AuthActions.logout.listen(function() {
  RestAPI.oauth2Logout();
});

module.exports = AuthActions;
