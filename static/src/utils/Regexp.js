"use strict";

var EMAIL = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
var TEL = /^1\d{10}$/;
var EMAIL_OR_TEL = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$|^1\d{10}$/;
var PASSWORD = /^(?![a-zA-Z]+$)(?![0-9]+$)[a-zA-Z0-9]{8,16}$/;

var isEmail = function (value) {
  return EMAIL.test(value);
};

var isTel = function (value) {
  return TEL.test(value);
};

var isPassword = function (value) {
  return PASSWORD.test(value);
};

module.exports = {
  isEmail: isEmail,
  isTel: isTel,
  isPassword: isPassword,
  pattern: {
    Email: EMAIL,
    Tel: TEL,
    EmailOrTel: EMAIL_OR_TEL,
    Password: PASSWORD
  }
};
