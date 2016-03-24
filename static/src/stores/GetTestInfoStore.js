"use strict";

var GetTestInfoActions = require("actions/GetTestInfoActions");


var testInfo = null;

var GetTestInfoStore = Reflux.createStore({
  init: function() {
    this.listenTo(GetTestInfoActions.getTestInfo.completed, this.onGetTestInfoCompleted);
    this.listenTo(GetTestInfoActions.getTestInfo.failed, this.onGetTestInfoFailed);
  },

  onGetTestInfoCompleted: function(ret) {
    this.updateTestInfoCompleted(ret);
  },

  onGetTestInfoFailed: function(/*ret*/) {
    this.updateTestInfoCompleted(null);
  },

  // 更新用户信息
  updateTestInfoCompleted: function(ret) {
    //if (ret) {
      testInfo = ret;
      this.trigger(testInfo); // 向监听组件发送更新的数据
    //}
  },
  // 获取产品试用信息
  getTestInfo: function() {
    return testInfo;
  },
  // this will be called by all listening components as they register their listeners
  getInitialState: function() {
    //var token = localStorage.getItem(localStorageKey);
    return testInfo;
  }
});

module.exports = GetTestInfoStore;
