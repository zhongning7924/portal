"use strict";

var getHttpUrl = function(path) {
  var host = window.location.host;
  return "http://" + host + path;
};

/**
 * 根据路由路径获取实际url
 **/
var getUrlByRoutePath = function(routePath) {
  return "/portal/#" + routePath;
};

var gotoPage = function(url, newTab) {
  if (newTab) {
    window.open(url);
  } else {
    window.location.href = url;
  }
};

var portalIndexUrl = getHttpUrl("/portal");
var loginUrl = "/portal/portal/login";
var registerUrl = "/portal/html/register.html";
var myAccountUrl = getUrlByRoutePath("/page/myaccount/account");
var backendManageUrl = "/business";
var expCenterUrl = getUrlByRoutePath("/page/expcenter");
var helpCenterUrl = getUrlByRoutePath("/page/helpcenter/user");
var aboutUrl = getUrlByRoutePath("/page/about");
var aboutDetailUrl = getUrlByRoutePath("/page/aunoticedetail");
var createCompanyUrl = "/portal/html/register.html?to=companyFromPer";

/* 获取登录并返回当前页的链接 */
var getLoginToCurUrl = function() {
  return loginUrl + "?loginToUrl=" + encodeURIComponent(window.location.pathname + window.location.hash);
};

module.exports = {
  getHttpUrl: getHttpUrl,
  gotoPage: gotoPage,
  getUrlByRoutePath: getUrlByRoutePath,
  getLoginToCurUrl: getLoginToCurUrl,
  URL: {
    home: portalIndexUrl,
    login: loginUrl,
    register: registerUrl,
    myAccount: myAccountUrl,
    backendManage: backendManageUrl,
    expCenter: expCenterUrl,
    helpCenter: helpCenterUrl,
    about: aboutUrl,
    aboutDetail: aboutDetailUrl,
    createCompany: createCompanyUrl
  }
};
