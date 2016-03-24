"use strict";
/*
 *author ludl3 2015-11-19 09:40
 *修改密码的提交按钮
 */
//样式文件
require("styles/less/myaccount.less");
var SubmitButton = React.createClass({
  render() {
    return (
      <div className="row form-action">
        <label className="col-sm-3 control-label"></label>
         <div className="col-sm-9 btn-left">
         {this.props.edit ?
         (<button type="button" className="btn btn-primary btn-position" onClick={this.props.onClickSubmitButton}>提交</button>) :
         (null)}
        </div>
      </div>
    );
  }
});
module.exports = SubmitButton;
