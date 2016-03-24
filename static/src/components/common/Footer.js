"use strict";

import url from "utils/Url";

require("styles/less/footer.less");

var Footer = React.createClass({
  propTypes: {
    /* 背景样式，默认为浅色，如果为深色，传入dark */
    bgStyle: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      bgStyle: ""
    };
  },

  getInitialState() {
    return {
      linkItems: [{
        label: "关于我们",
        url: url.URL.about + "/aboutus"
      }, {
        label: "法律声明",
        url: url.URL.about + "/declaration"
      }, {
        label: "服务公告",
        url: url.URL.about + "/notice"
      }, {
        label: "联系我们",
        url: url.URL.about + "/contactus"
      }]
    };
  },

  render() {
    var className = "hsy-footer text-center " + this.props.bgStyle;
    var footerNodes = this.state.linkItems.map(function(item, index) {
      return (
        <li key={"foot_" + index}><a href={item.url} target="_blank">{item.label}</a></li>
      );
    });
    return (
      <div className={className}>
        <ul className="list-inline">{footerNodes}</ul>
        <p>版权所有©&nbsp;2015&nbsp;用友网络科技股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;京ICP备05007539号-13&nbsp;&nbsp;&nbsp;京ICP证100714号&nbsp;&nbsp;&nbsp;&nbsp;京工网安备1101080209224号</p>
      </div>
    );
  }
});

module.exports = Footer;
