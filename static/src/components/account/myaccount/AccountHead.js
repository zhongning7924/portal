"use strict";
/*
 *author ludl3 2015-11-19 08:40
 *我的账户页标题
 */
//样式文件
require("styles/less/myaccount.less");
//标签
var AccountHead = React.createClass({
  render() {
   return (
     <div className="container-fluid account-subpage-header" id="header">
       <div className="container">
         <div className="pull-left account-head head-space">
           <a className="logo" href="/portal">
             <img src="/portal/img/logo.png" alt="惠商云平台"/>
           </a>
           <span className="title">{this.props.title}</span>
         </div>
       </div>
     </div>
   );
  }
});
 module.exports = AccountHead;





