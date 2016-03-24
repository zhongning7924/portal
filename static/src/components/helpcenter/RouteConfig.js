/**
 * 帮助中心－路由配置
 **/
"use strict";
var pathPrefix = "/page/helpcenter/";

module.exports = {
  user: {
    name: "用户指南",
    path: pathPrefix + "user",
    pathName: "hcuser"
  },
  userAccount: {
    name: "用户账号",
    path: pathPrefix + "user/account",
    pathName: "hcuseraccount"
  },
  userAgreement: {
    name: "用户服务协议",
    path: pathPrefix + "user/agreement",
    pathName: "hcuseragreement"
  },
  finance: {
    name: "财务问题",
    path: pathPrefix + "finance",
    pathName: "hcfinance"
  },
  financeBilling: {
    name: "计费说明",
    path: pathPrefix + "finance/billing",
    pathName: "hcfinancebilling"
  },
  financeRecharge: {
    name: "充值说明",
    path: pathPrefix + "finance/recharge",
    pathName: "hcfinancerecharge"
  },
  financeAgreement: {
    name: "运营服务合同",
    path: pathPrefix + "finance/agreement",
    pathName: "hcfinanceagreement"
  },
  service: {
    name: "联系客服",
    path: pathPrefix + "service",
    pathName: "hcservice"
  }
};
