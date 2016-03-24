"use strict";
var RestAPI = require("utils/RestAPI");
var GetNoticeListActions = Reflux.createActions({
  "GetNoticeList": {children: ["completed", "failed"] },
  "GetNoticeDetail": {children: ["completed", "failed"] }
});
// 获取公告列表信息
GetNoticeListActions.GetNoticeList.listen(function(start, pagesize) {
  var that = this;
  RestAPI.request({
    url: RestAPI.URL.GETNOTICEDADA + "?q=" + "&start=0" + start + "&size=" + pagesize,
    method: "GET",
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});
// 获取公告列表信息
GetNoticeListActions.GetNoticeDetail.listen(function(noticeID) {
  var that = this;
  RestAPI.request({
    url: RestAPI.URL.GETNOTICEDETAIL + "/" + noticeID,
    method: "GET",
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});
module.exports = GetNoticeListActions;
