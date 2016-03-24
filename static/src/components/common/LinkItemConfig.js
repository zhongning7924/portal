"use strict";

import AuthStore from "stores/AuthStore";
import AuthToken from "utils/AuthToken";

var LINK_ITEMS = {
  api: {
    name: "开放平台",
    siteUrl: "http://api.yyuap.com/api/list.do?cid=77",
    introUrl: "http://api.yyuap.com/api/list.do?cid=77",
    aHref: "http://api.yyuap.com/api/list.do?cid=77",
    carouselImg: require("images/home/banner_api.png"),
    aTarget: "_blank",
    introImg: "",
    introText: ""
  },
  ism: {
    name: "ism服务",
    siteUrl: "${pom.url.ism}",
    introUrl: "${pom.url.ism}",
    aHref: "${pom.url.ism}",
    carouselImg: "",
    aTarget: "_blank",
    introImg: "",
    introText: ""
  },
  welink: {
    name: "微联",
    siteUrl: "${pom.url.welink}",
    introUrl: "/portal/ywl/index.html",
    aHref: "/portal/ywl/index.html",
    carouselImg: require("images/home/banner_wl.jpg"),
    aTarget: "_blank",
    introImg: require("images/home/pic_wlink.jpg"),
    introText: "助力企业微信公众号进行官方形象展示、粉丝互动、促销推广等线上运营。"
  },
  youlink: {
    name: "友联",
    siteUrl: "http://cs.yonyou.com/",
    introUrl: "http://cs.yonyou.com/",
    aHref: "http://cs.yonyou.com/",
    carouselImg: require("images/home/banner_yl.jpg"),
    aTarget: "_blank",
    introImg: require("images/home/pic_ylink.jpg"),
    introText: "企业级的网站实时交流系统，利用强大的信息流量、访客监控和实时对话，发现和抓住身边的每一个机会，提升客户满意度和销售额。"
  },
  eccloud: {
    name: "电商通",
    siteUrl: "http://www.hsclouds.com/eccloud-inter/portal!doNotNeedSession_portal.do",
    introUrl: "http://www.hsclouds.com/eccloud-inter/portal!doNotNeedSession_portal.do",
    aHref: "http://www.hsclouds.com/eccloud-inter/portal!doNotNeedSession_portal.do",
    carouselImg: require("images/home/banner_dst.jpg"),
    aTarget: "_blank",
    introImg: require("images/home/pic_dst.jpg"),
    introText: "集成统一电商平台接口，对外提供标准解决方案，强大的技术服务支持，降低企业运营维护成本。面向多渠道电商企业，提供数据云服务。"
  },
  ykt: {
    name: "友客通",
    siteUrl: "${pom.url.ykt}",
    introUrl: "/portal/ykt/index.html",
    aHref: "/portal/ykt/index.html",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_ykt.jpg"),
    introText: "地产行业移动营销工具，调动粉丝社交关系卖房。基于微信实现粉丝营销和在线房产交易。"
  },
  dudu: {
    name: "用友嘟嘟",
    siteUrl: "/portal/dudu/index.html",
    introUrl: "/portal/dudu/index.html",
    aHref: "/portal/dudu/index.html",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_yydd.png"),
    introText: "软件应用里直接发起相关人多方通话，不依赖WiFi，支持各种应用挂接嘟嘟通信。"
  },
  cly: {
    name: "畅联云",
    siteUrl: "/portal/cly/ktIndex.html",
    introUrl: "/portal/cly/ktIndex.html",
    aHref: "/portal/cly/ktIndex.html",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_cly.jpg"),
    introText: "基于优质的智能硬件，丰富的行业经验为企业提供一整套商业Wi-Fi解决方案，提供商业Wi-Fi硬件，室内定位导航，线下客流统计，微信微博吸粉，数据分析等技术服务。"
  },
  app: {
    name: "移动应用",
    siteUrl: "http://app.yonyou.com",
    introUrl: "http://app.yonyou.com",
    aHref: "http://app.yonyou.com",
    carouselImg: "",
    aTarget: "_blank",
    introImg: "",
    introText: ""
  },
  bbs: {
    name: "社区",
    siteUrl: "${pom.url.sevicelink}",
    introUrl: "${pom.url.sevicelink}",
    aHref: "${pom.url.sevicelink}",
    carouselImg: "",
    aTarget: "_blank",
    introImg: "img/pic_1.jpg",
    introText: ""
  },
  bap: {
    name: "数据云",
    siteUrl: "${pom.url.bap}",
    introUrl: "${pom.url.bap}",
    aHref: "${pom.url.bap}",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_sjy.jpg"),
    introText: "面向企业深度分析行业信息、侦测市场情报、提供行业对标的数据服务和解决方案，支撑企业获得更为全面的数据，将互联网化的内容转化为企业资产。"
  },
  academy: {
    name: "培训云",
    siteUrl: "${pom.url.academy}",
    introUrl: "${pom.url.academy}",
    aHref: "${pom.url.academy}",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_pxy.jpg"),
    introText: "用友NC培训认证中心学习平台，提供培训、认证、考试一体化服务。围绕顾问能力成长学习路径图，提供匹配的全套课程。"
  },
  pcos: {
    name: "云ERP",
    siteUrl: "http://store.yonyou.com/",
    introUrl: "http://store.yonyou.com/",
    aHref: "http://store.yonyou.com/",
    carouselImg: "",
    aTarget: "_blank",
    introImg: "",
    introText: ""
  },
  ydz: {
    name: "易代账",
    siteUrl: "http://e.uu.com.cn",
    introUrl: "http://e.uu.com.cn",
    aHref: "http://e.uu.com.cn",
    aTarget: "_blank",
    introText: ""
  },
  qyj: {
    name: "企业+",
    siteUrl: "",
    introUrl: "/portal/html/hs_detail.html",
    aHref: "/portal/html/hs_detail.html",
    carouselImg: require("images/home/banner_qyj.jpg"),
    aTarget: "_blank",
    introImg: require("images/home/pic_qyj.jpg"),
    introText: "无缝集成移动审批、企业通讯录、薪资查询、企业IM，打造企业级全员移动应用及企业应用统一入口。"
  },
  crm: {
    name: "营销宝",
    siteUrl: "/crm/",
    introUrl: "/crm/",
    aHref: "/crm/",
    carouselImg: require("images/home/banner_yxb.jpg"),
    aTarget: "_blank",
    introImg: "",
    introText: ""
  },
  mobilecrm: {
    name: "移动CRM",
    siteUrl: "javascript:void(0);",
    introUrl: "javascript:void(0);",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_mobilecrm.jpg"),
    introText: "全员、全过程销售过程管理应用包括从名片、线索开始，客户、商机、联系人、行动等过程管理到销售预测、销售漏斗的销售过程全覆盖的移动应用。"
  },
  mobileqdbf: {
    name: "移动渠道拜访",
    siteUrl: "javascript:void(0);",
    introUrl: "javascript:void(0);",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_mobileqdbf.jpg"),
    introText: "渠道拜访移动应用的主要使用人群是业务代表。实现主管制定拜访计划生成拜访日程安排，渠道业务人员按照日程安排到渠道终端现场进行拜访，同时，让移动终端成为渠道人员随身的业务工具，随时随地进行多角度查询。"
  },
  mobilesale: {
    name: "移动营销",
    siteUrl: "javascript:void(0);",
    introUrl: "javascript:void(0);",
    carouselImg: "",
    aTarget: "_blank",
    introImg: require("images/home/pic_mobilesale.jpg"),
    introText: "以客户为核心的移动营销应用，是企业级移动应用方案的主战场。利用移动互联网将企业的外部伙伴（通路）、客户（销售终端、分销商）、业务代表、会员等角色融合为企业业务的前台，将企业销售业务外延进行有效拓展。"
  }
};

var getLinkItems = function() {
  var ret = _.cloneDeep(LINK_ITEMS);
  if (AuthStore.loggedIn()) {
    var atSearch = "?access_token=" + AuthToken.getToken();
    ret.welink.aHref = ret.welink.siteUrl;
    ret.ykt.aHref = ret.ykt.siteUrl + atSearch;
    ret.ydz.aHref = "http://www.uu.com.cn/auth/thirdSSOPage?app=ydz&appKey=346fc2a8-a13f-4315-b431-75c595cdc180&appSecret=rqbrwx&clientId=346fc2a8-a13f-4315-b431-75c595cdc180&clientSecret=rqbrwx&originCode=hsclouds&thirdPlatform=hsclouds&thirdPlatformUserId=131279&mobile=null";
    ret.academy.aHref = ret.academy.siteUrl + atSearch;
    ret.bbs.aHref = "http://bbs.hsclouds.com/dz/login.jsp";
  }
  return ret;
};

module.exports = {
  getLinkItems: getLinkItems
};
