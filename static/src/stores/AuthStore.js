"use strict";

var AuthActions = require("actions/AuthActions");
var authToken = require("utils/AuthToken");

var loading = true; // 初始为ajax请求状态
var userInfo = null;

var AuthStore = Reflux.createStore({
  init() {
    this.listenTo(AuthActions.getUser.completed, this.onGetUserCompleted);
    this.listenTo(AuthActions.getUser.failed, this.onGetUserFailed);
  },

  onGetUserCompleted(ret) {
    this.updateUserInfo(ret);
  },

  onGetUserFailed(/*ret*/) {
    this.updateUserInfo(null);
  },

  // 判断用户是否已登录
  loggedIn() {
    return authToken.hasToken();
  },

  // 获取用户信息
  getUserInfo() {
    return userInfo;
  },

  // 获取用户id
  getUserId() {
    if (_.isObject(userInfo)) {
      return userInfo.userId;
    }
    return -1;
  },

  // 获取用户名
  getUserName() {
    if (_.isObject(userInfo)) {
      return userInfo.userName;
    }
    return "";
  },

  // 企业帐号
  getcarrierDomain() {
    if (_.isObject(userInfo)) {
      return userInfo.carrierdomain;
    }
    return "";
  },

  // 获取用户所属企业id
  getCarrierId() {
    if (_.isObject(userInfo)) {
      return userInfo.carrierId;
    }
    return "";
  },

  // 获取用户所属组织机构id
  getStoreId() {
    if (_.isObject(userInfo) && userInfo.storeId) {
      return userInfo.storeId;
    }
    return -1;
  },

  // 更新用户信息
  updateUserInfo(ret) {
    //if (ret) {
      loading = false;
      userInfo = ret;
      this.trigger(userInfo); // 向监听组件发送更新的数据
    //}
  },

  // this will be called by all listening components as they register their listeners
  getInitialState() {
    //var token = localStorage.getItem(localStorageKey);
    return userInfo;
  },

  isLoading() {
    return loading;
  }
});

module.exports = AuthStore;
