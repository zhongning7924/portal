/**
 * 帮助中心－用户指南－用户账号
 **/
"use strict";

import url from "utils/Url";

var UserAccount = React.createClass({
  render() {
    var img1 = require("images/helpcenter/account01.png");
    var img2 = require("images/helpcenter/account02.png");
    return (
      <div className="useraccount">
        <h3 className>用户帐号 </h3>
        <p className="second-line">1.账号类型 </p>
        <p className="">惠商云注册账号分企业账号和个人账号两种类型。</p>
        <p>• 企业账号：以企业为主体的账号，支持企业管理员进行日常管理。</p>
        <p>推荐企业、事业单位注册;</p>
        <p>适用产品包括所有惠商云提供的企业云服务、移动应用产品。</p>
        <p>• 个人账号：以自然人为主体的账号。</p>
        <p>推荐个人用户、个人开发者用户注册；</p>
        <p>适用产品包括社区、微联等支持个人用户使用的产品。</p>
        <h3 className="frist-line">2.注册流程</h3>
        <img className="second-line" src={img1}/>
        <img className="second-line"src={img2}/>
        <h3 className="frist-line">3.关键名称说明</h3>
        <p className="second-line">• 企业邀请信息 </p>
        <p>包括“分享链接”和“分享二维码”，访客点击后打开该企业的用户注册页面。</p>
        <p>• 企业用户</p>
        <p>个人账号中所属企业字段不为空的用户，可以享受企业所有的应用和服务。</p>
        <p>• 未审核用户</p>
        <p>企业用户注册后变为未审核用户，默认已激活，无法使用企业应用。</p>
        <p>• 已审核用户</p>
        <p>企业用户通过管理员审核后变成已审核用户，可以使用企业应用。</p>
        <p>• 独立用户 </p>
        <p>个人账号中所属企业字段为空的用户。</p>
        <p>• 企业认证</p>
        <p>企业账号“企业名称”、“ 营业执照号”、“ 组织机构代码证”、“ 税务登记证号”如实填写则定义为认证企业，企业认证需要系统管理员审核。</p>
        <p>• 营业执照号</p>
        <p>营业执照号是企业或组织合法经营权的凭证。 </p>
        <p>• 组织机构代码证 </p>
        <p>组织机构代码是对中华人民共和国境内依法注册、依法登记的机关、企、事业单位、社会团体和民办非企业单位颁发一个在全国范围内唯一的、始终不变的代码标识。 </p>
        <p>• 税务登记证号 </p>
        <p>税务登记证，是从事生产、经营的纳税人向生产、经营地或者纳税义务发生地的主管税务机关申报办理税务登记时，所颁发的登记凭证。 </p>
      </div>
    );
  }
});

module.exports = UserAccount;
