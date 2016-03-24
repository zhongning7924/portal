"use strict";

var GetNoticeListActions = require("actions/GetNoticeListActions");
var noticeList = null;
var noticeDetail = null;
var GetNoticeListStore = Reflux.createStore({
  init: function() {
    this.listenTo(GetNoticeListActions.GetNoticeList.completed, this.onGetNoticeListCompleted);
    this.listenTo(GetNoticeListActions.GetNoticeList.failed, this.onGetNoticeListFailed);
    this.listenTo(GetNoticeListActions.GetNoticeDetail.completed, this.onGetNoticeDetailCompleted);
    this.listenTo(GetNoticeListActions.GetNoticeDetail.failed, this.onGetNoticeDetailFailed);
  },

  onGetNoticeListCompleted: function(ret) {
    this.updateGetNoticeListCompleted(ret);
  },

  onGetNoticeListFailed: function(/*ret*/) {
    this.updateGetNoticeListCompleted(null);
  },

  // 更新公告列表信息
  updateGetNoticeListCompleted: function(ret) {
    //if (ret) {
      noticeList = ret;
      this.trigger(noticeList); // 向监听组件发送更新的数据
    //}
  },
  //公告明细
  onGetNoticeDetailCompleted: function(ret) {
    this.updateGetNoticeDetailCompleted(ret);
  },

  onGetNoticeDetailFailed: function(/*ret*/) {
    this.updateGetNoticeDetailCompleted(null);
  },

  // 更公告明细信息
  updateGetNoticeDetailCompleted: function(ret) {
    noticeDetail = ret;
    this.trigger(noticeDetail); // 向监听组件发送更新的数据
  },
  // 获取服务公告列表信息
  getNoticeList: function() {
    return noticeList;
  },
    // 获取服务公告明细信息
  getNoticeDetail: function() {
    return noticeDetail;
  },
  // this will be called by all listening components as they register their listeners
  getInitialState: function() {
    //var token = localStorage.getItem(localStorageKey);
    return noticeList;
  }
});

module.exports = GetNoticeListStore;
