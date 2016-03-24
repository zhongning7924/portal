"use strict";

/**
 * 右下侧－在线客服
 */
import AuthStore from "stores/AuthStore";

// 引入友联代码后调用该方法打开在线客服窗口
function openChatWindow() {
  try {
    hj5107.openChat();
  } catch (e) {
    var chatUrl = "http://cs.yonyou.com/web/icc/chat/chat?c=21&s=1";
    var wid = window.open(chatUrl, "hj5107", "toolbar=no,location=no,directories=no,scrollbars=no,menubar=no,width=720,height=470,resizable=yes,left=0,top=0,status=no");
    if (typeof (wid) !== "undefined") {
      wid.focus();
    }
  }
}

const OnlineService = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  handleUserInfoChange() {
    var userinfo = AuthStore.getUserInfo();
    if (userinfo) {
      //写入动态获取的用户信息-客服传入会员信息
      var body = document.getElementsByTagName("body").item(0);
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "hjUserData";
      var hjUserData = "var hjUserData = \""
        + encodeURIComponent(userinfo.userName)
        + "|" + encodeURIComponent(userinfo.sex)
        + "|" + encodeURIComponent(userinfo.telphone)
        + "|" + encodeURIComponent(userinfo.mobile)
        + "|" + encodeURIComponent(userinfo.email)
        + "||" + encodeURIComponent(userinfo.carrierName)
        + "||" + encodeURIComponent(userinfo.qq)
        + "|" + encodeURIComponent(userinfo.userId)
        + "||\"";
      script.innerHTML = hjUserData;
      body.appendChild(script);
    }
  },

  handleClick(e) {
    e.preventDefault();

    // 打开在线客服聊天窗口
    openChatWindow();
  },

  render() {
    return (
      <div className="side-btn online">
        <a href="javacript:void(0);" onClick={this.handleClick}>
          <span className="text">在线客服</span>
          <span className="icon">
            <i className="iconfont">&#xe600;</i>
          </span>
        </a>
      </div>
    );
  }
});

module.exports = OnlineService;
