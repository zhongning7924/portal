"use strict";
/*
 *author ludl3 2015-11-27 10:40
 *我的账户的邀请链接字段复制和生成二维码
 */
var RestAPI = require("utils/RestAPI");
//复制
var ReactZeroClipboard = require("react-zeroclipboard-ie8");
import DlgAlert from "../../common/DlgAlert";
//样式文件
require("styles/less/myaccount.less");

var CopyAndCreateCode = React.createClass({
  mixins: [Reflux.ListenerMixin],
  //初始化
  getInitialState() {
    return {
      url: "",
      show: "0"
    };
  },
  onSuccess() {
    //复制粘贴成功
    this.setState({
      show: "3"
    });
  },
  onNull() {
    //复制元素为空
    this.setState({
      show: "1"
    });
  },
  onNullCreateCode() {
    //生成邀请链接元素为空
    this.setState({
      show: "2"
    });
  },
  onCreateCode(e) {
    var url = e.target.getAttribute("data-value");
    if (url) {
      var href = RestAPI.URL.CREATE_CODE + "?c=" + url;
      //生成邀请链接成功
      this.setState({
        url: href,
        show: "4"
      });
    }
  },
  init() {
    this.setState({
      show: "0"
    });
  },

  render() {
    const style = {
       backgroundColor: "transparent",
       border: "0px"
    };
    var value = this.props.value;
    var isShow = false;//复制成功提示
    var isCreate = false;//生成二维码成功提示
    var isNullShow = false;//复制邀请链接为空提示
    var isNullCreate = false;//生成二维码邀请链接为空提示
    if (this.state.show === "1") {
      isNullShow = true;
    }
    else if (this.state.show === "2") {
      isNullCreate = true;
    }
    else if (this.state.show === "3") {
      isShow = true;
    }
    else if (this.state.show === "4") {
      isCreate = true;
    }
    else {
      isNullShow = false;
      isNullCreate = false;
      isShow = false;
      isCreate = false;
    }
    return (
      <div className="col-sm-5 form-val" id="linked">
        <DlgAlert show={isNullShow} content="邀请码为空，不能复制分享链接." closeCallback={this.init}/>
        <DlgAlert show={isNullCreate} content="邀请码为空，不可生成分享二维码" closeCallback={this.init}/>
        <DlgAlert show={isShow} content="已复制好，可贴粘." closeCallback={this.init}/>
        <DlgAlert show={isCreate} content="生成分享二维码成功" closeCallback={this.init}/>
        {value ? (<ReactZeroClipboard scriptSrc={"/portal/js/zeroclipboard/ZeroClipboard"} style={style} text={value} onAfterCopy={this.onSuccess}>
          <a href="javascript:void(0)" className='copyLink' id='copy'>复制分享链接</a>
        </ReactZeroClipboard>) :
        (<a className="copyLink" id="copy" onClick={this.onNull}>复制分享链接</a>)}
        {value ? (<a className="copyLink" id="createcode" data-value={value} href={this.state.url} onClick={this.onCreateCode}>生成分享二维码</a>) :
        (<a className="copyLink" id="createcode" onClick={this.onNullCreateCode}>生成分享二维码</a>)}
      </div>
    );
  }
});
module.exports = CopyAndCreateCode;
