"use strict";

var RestAPI = require("utils/RestAPI");
var GetTestInfoActions = Reflux.createActions({
  "getTestInfo": {children: ["completed", "failed"] } // 获取试用产品信息
});

GetTestInfoActions.getTestInfo.listen(function(carrierid) {
  var that = this;
  RestAPI.request({
    url: RestAPI.URL.GETUSERTESTINFO + "/" + carrierid + "/wl000",
    method: "GET",
    successCallback: function(data) {
      that.completed(data);
    },
    errorCallback: function(res) {
      that.failed(res);
    }
  });
});
module.exports = GetTestInfoActions;
