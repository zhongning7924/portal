"use strict";
/*
 *author ludl3 2015-11-19 09:40
 *我的账户的按钮
 */
//样式文件
require("styles/less/myaccount.less");
var EditButton = React.createClass({
  render() {
    return (
      <div className="row form-action">
        <label className="col-sm-3 control-label"></label>
         <div className="col-sm-9 btn-left">
           {this.props.edit ?
           (<div><button type="button" className="btn btn-primary btn-position" onClick={this.props.onClickSaveButton}>保存</button>
            <button type="button" className="btn btn-default btn-position" onClick={this.props.onClickCancleButton}>取消</button></div>) :
           (<button type="button" className="btn btn-primary btn-position" onClick={this.props.onClickEditButton} >修改</button>)}
        </div>
      </div>
    );
  }
});
module.exports = EditButton;
