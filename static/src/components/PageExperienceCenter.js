"use strict";

// import {Grid, Row, Col} from "react-bootstrap";
import Navbar from "./common/Navbar";
import ExpContent from "./experience/ExpContent";
import AuthStore from "stores/AuthStore";
import GetTestInfoActions from "actions/GetTestInfoActions";
import GetTestInfoStore from "stores/GetTestInfoStore";
import url from "utils/Url";
require("styles/less/expriencecenter.less");

var bannerImg = require("images/experienceCenter/banner_exp.jpg");
var items = {
  wl: {
    cplb: "WL",
    name: "微联云服务",
    btnstyle: "false",
    btntext: "60天免费试用",
    spantext: "",
    text: "",
    alink: "",
    href: url.getLoginToCurUrl(),
    img: require("images/experienceCenter/pic_wl.png"),
    introText: "助力企业微信公众号进行官方形象展示、粉丝互动、促销推广等线上运营； 提供一站式微信运营第三方平台服务，提供微汽车、微互动、微商城、微餐饮、微会议、微房产、微酒店、微医疗等行业解决方案，更易用，更直观。"
  },
  yl: {
    cplb: "YL",
    name: "友联云服务",
    btnstyle: "false",
    btntext: "60天免费试用",
    href: "http://cs.yonyou.com/manage/youlink/loginCloud.html",
    img: require("images/experienceCenter/pic_yl.png"),
    introText: "企业级的网站实时交流系统，利用强大的信息流量、访客监控和实时对话，发现和抓住身边的每一个机会，提升客户满意度和销售额。提供实时、高效、及时、安全的实时交流服务平台。"
  },
  sjy: {
    cplb: "SJY",
    name: "数据云服务",
    btnstyle: "false",
    btntext: "免费试用",
    spantext: "",
    href: url.getLoginToCurUrl(),
    img: require("images/experienceCenter/pic_sjy.jpg"),
    introText: "帮助企业实现DT时代的企业数据全景视图，应用数据科学、智能决策辅助企业运营。基于SAAS模式构建的自助型产品BQ Cloud，能快速搭建分析模型，自助设计可视化效果；行业数据、智能模型提供全产业链数据分析，舆情分析帮助企业及时了解互联网舆论信息。"
  }
};
var PageExperienceCenter = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState() {
    return {
      items: items
    };
  },

  handleUserInfoChange() {
    var userInfo = AuthStore.getUserInfo();
    var sjylink = "http://data.hsclouds.com:8888/ba/authmrg/index.htm?mtype=0";
    if (!userInfo) {
      var loginToCurUrl = url.getLoginToCurUrl();
      items.wl.href = loginToCurUrl;
      items.sjy.href = loginToCurUrl;
    }
    else {
      var carrierId = userInfo.carrierId;
      if (carrierId) {
         if (carrierId === -1) {//系统管理员
           items.sjy.href = sjylink;
           items.wl.spantext = "您为系统管理员，无法试用!";
           items.wl.btnstyle = "true";
         }
         else if (carrierId === -2) {//个人用户
           items.wl.href = "javascript:void(0);";
           items.wl.spantext = "企业级应用服务,";
           items.wl.alink = "/portal/html/register.html?to=companyFromPer";
           items.wl.atext = "个人注册用户需要补充所属企业信息才能试用";
           items.wl.btnstyle = "true";
           items.sjy.spantext = "您注册的是个人用户无法试用此功能!";
           items.sjy.btnstyle = "true";
           items.sjy.href = "javascript:void(0);";
         }
         else {//企业用户
           GetTestInfoActions.getTestInfo.trigger(userInfo.carrierId);//调用该企业下的试用信息接口
           items.sjy.href = sjylink;
         }
      }
    }
    this.setState({
      items: items
    });
  },
  handleTrialInfoChange() {
    var trialInfo = GetTestInfoStore.getTestInfo();
    if (trialInfo) {
      if (trialInfo.code) {
        //试用中的直接进入
        if (trialInfo.code === "110000") {
          items.wl.href = "http://welink.yonyou.com";
        }
        //试用已停用
        if (trialInfo.code === "110001") {
          items.wl.spantext = "当前应用已超过试用期限，请咨询企业管理员";
          items.wl.btnstyle = "true";
          items.wl.href = "javascript:void(0);";
        }
               //购买，使用中
        if (trialInfo.code === "110002" || trialInfo.code === "110003") {
          items.wl.alink = "http://welink.yonyou.com";
          items.wl.spantext = "你已经购买此应用，请";
          items.wl.atext = "点击进行使用";
          items.wl.btnstyle = "true";
          items.wl.href = "javascript:void(0);";
        }
      }
    }
    else {//未使用微联任何服务，需要调用开通试用接口
      items.wl.isNeedOpen = "true";
    }
    this.setState({
      items: items
    });
  },
  componentWillMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
    this.listenTo(GetTestInfoStore, this.handleTrialInfoChange);
  },
  render() {
    return (
      <div className="hsy-experience">
        <Navbar />
        <img className="bannerImg img-responsive" src={bannerImg} alt=""/>
        <ExpContent items={items.wl}/>
        <ExpContent items={items.yl}/>
        <ExpContent items={items.sjy}/>
      </div>
    );
  }
});

module.exports = PageExperienceCenter;
