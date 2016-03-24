"use strict";
/*
 *author ludl3 2015-12-08 10:52
 *上传头像
 */
var RestAPI = require("utils/RestAPI");
//样式文件
require("styles/less/imageUpload.less");
var ImgUpload = React.createClass({
  //初始化
  getInitialState() {
    return {
      ImgSrc: RestAPI.URL.GET_IMG + this.props.key,
      error: false//错误信息
    };
  },
  render() {
    return (
      <div className="form-group imgUpload">
        <label className="col-sm-3 control-label">用户头像：</label>
        <div className="col-sm-9">
          <div className="row">
            <div className="col-sm-1">
              <img src={this.state.ImgSrc}/>
            </div>
            <div className="col-sm-11">
              <span className="msg">图片尺寸为50*50像素，上传小于200kb的png或jpg图片文件
              </span>
              <div className="row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm-9">
                  {this.state.error ? (<span className="errormsg">请上传png或jpg格式图片/请上传小于200K的图片</span>) :
                  (null)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
module.exports = ImgUpload;
