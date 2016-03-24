"use strict";
/*
 *author ludl3 2015-11-19 09:40
 *我的账户表单的操作提示
 */
//样式文件
require("styles/less/myaccount.less");
import url from "utils/Url";
var AccountTitle = React.createClass({
  createCompany() {
    url.gotoPage(url.URL.createCompany);
  },
  render() {
    return (
      <div className="title-line">
        {this.props.individual ? (<a className="createCompany" onClick={this.createCompany}>
        创建企业账号
        </a>) : (null)}
      </div>
	);
  }
});
module.exports = AccountTitle;
