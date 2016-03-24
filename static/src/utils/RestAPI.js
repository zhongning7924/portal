"use strict";

var PRJ_NAME = "portal";
var MOD_PUBBASE = "/pubbase/"; // pubbase模块前缀

// 接口url
var REQ_URL = {
  GETUSERTESTINFO: MOD_PUBBASE + "billing/c_apptestQuery",//查询试用
  CREATEUSERTEST: MOD_PUBBASE + "billing/c_apptest",//创建试用
  GETNOTICEDETAIL: MOD_PUBBASE + "notice/getnoticebyid",//获取公告明细
  GETNOTICEDADA: MOD_PUBBASE + "notice/getalltypenotice",// 获取已经发布公告
  GET_USERINFO: MOD_PUBBASE + "oauth2/getcurrentuser", // 获取用户信息
  // GET_CAPTCHA: MOD_PUBBASE + "findpwd/validate/getcaptcha", // 获取邮箱/手机验证码
  GET_CAPTCHA: MOD_PUBBASE + "findpwd/getcaptcha", // 获取邮箱/手机验证码
  EMAILUPDATEPWD: MOD_PUBBASE + "findpwd/updatepwd", //更新用户密码
  VALIDATE_CAPTCHA: MOD_PUBBASE + "register/validatecaptcha",
  SETPWDANDACTIVE: MOD_PUBBASE + "findpwd/setpwdandactive",
  VALIDATE_ACCOUNT: MOD_PUBBASE + "register/validate", //邮箱/手机号判重接口
  ACTIVATE_SENDEMAIL: MOD_PUBBASE + "register/sendemail", //用户激活发送邮件接口
  UPDATEPWD: MOD_PUBBASE + "user/updatepwd.do",//修改用户密码
  UPDATEUSER: MOD_PUBBASE + "user/updateadminuser",//修改用户信息
  CREATE_CODE: MOD_PUBBASE + "qrcode/gen",//邀请链接生产二维码
  VALIDATE_CODE: MOD_PUBBASE + "register/validatecode",//工号判重接口
  GET_IMG: MOD_PUBBASE + "fileupload/common/getfile/pic/",//获取图片
  GET_KRY: MOD_PUBBASE + "fileupload/common/getkeys/1",//生成存储图片的文件
  IMG_UPLOAD: MOD_PUBBASE + "fileupload/common/pic/",//图片上传+key;
  IMG_USER: MOD_PUBBASE + "user/headportrait/"//上传图片成功后和用户关联 + userId +"/"+ key,
};
var authToken = require("./AuthToken");
/**
 * 退出登录
 */
var oauth2Logout = function() {
  // 跳转到退出接口，回到登录界面
  window.location.href = "/" + PRJ_NAME + "/logout";
};

var logOauth2Error = function(data) {
  if (data) {
    console.log("服务器返回OAuth2.0错误（" + data.error + "）\n错误代码：" +
    data.error_code + "\n错误信息：" + data.error_description + "\n错误URI：" + data.error_uri);
  }
};

// ajax请求封装，使用superagent
var sa = require("superagent");
var request = function(settings) {
  var defaults = {
    method: "GET", // 默认请求方法
    type: "json", // 请求体发送方式
    url: "", // 请求url
    addToken: true, // 是否在请求中加上token信息
    reloginIfTokenExpired: false, // 是否token失效自动跳转到登录界面
    send: "",
    query: "",
    //type : "", // 默认content-type
    //accept : "", // 默认接受类型
    successCallback: function(/*data*/) {
      // 请求成功的回调函数
    },
    errorCallback: function(/*res*/) {
      // 请求失败的回调函数，包括http客户端错误、服务端错误、以及接口调用成功但存在业务错误
    },
    endCallback: function(/*res*/) {
    }
  };
  _.assign(defaults, settings);

  var authorization = "";
  if (defaults.addToken) {
    //保存access_token的cookie名称与com.yonyou.mcloud.security.oauth2.client.CASWebClientFilter中的accessTokenCookieName参数要一致
    var accessToken = authToken.getToken();
    if (accessToken) {
      authorization = "OAuth2 " + accessToken;
    } else {
      //如果启用了access_token失效时自动重新登录的功能
      if (defaults.reloginIfTokenExpired) {
        //刷新
        oauth2Logout();
      }
    }
  }

  // 发送ajax请求
  var contentType = "application/json;charset=UTF-8";
  if (defaults.type === "form") {
    contentType = "application/x-www-form-urlencoded;charset=UTF-8";
  }
  sa(defaults.method, defaults.url)
    .set("Authorization", authorization)
    .set("Content-Type", contentType)
    //.type(defaults.type)
    .query(defaults.query)
    .send(defaults.send)
    .end(function(err, res) {
      if (!res) {
        console.log(err);
        console.log(res);
      }

      if (res && res.badRequest) {
        if (res.body !== null) {
          //如果启用了access_token失效时自动重新登录的功能
          if (defaults.reloginIfTokenExpired) {
            //8193错误：access_token未找到
            //8211错误：access_token无效，可能已过期，需要重新授权
            if (res.body.error_code === 8211 || res.body.error_code === 8193) {
              oauth2Logout();
            }
          }
          logOauth2Error(res.body);
          // oauth2Relogin();
        }
      }

      if (res && res.ok) {
        if (res.body && _.isString(res.body.flag)) {
          if (res.body.flag === "000000") {
            defaults.successCallback(res.body.data);
            return;
          }
        } else {
          defaults.successCallback(res.body);
          return;
        }
      }

      defaults.errorCallback(res);
    });
};

var RestAPI = {
  URL: REQ_URL,
  request: request,
  oauth2Logout: oauth2Logout
};
module.exports = RestAPI;
