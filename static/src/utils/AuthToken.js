"use strict";

var cookieTokenKey = "at";
var Cookies = require("js-cookie");

// var removeToken = function(){
//   Cookies.remove(cookieTokenKey);
// };

var getToken = function() {
  return Cookies.get(cookieTokenKey);
};

var setToken = function(token) {
  Cookies.set(cookieTokenKey, token);
};

var hasToken = function() {
  return !!Cookies.get(cookieTokenKey);
};

module.exports = {
  //removeToken: removeToken,
  getToken: getToken,
  setToken: setToken,
  hasToken: hasToken
};
