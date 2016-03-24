"use strict";

import AuthStore from "stores/AuthStore";
import LinkItemConfig from "components/common/LinkItemConfig";

function getGroupItems() {
  var linkItems = LinkItemConfig.getLinkItems();
  return [{
    name: "云服务",
    children: [
      linkItems.welink,
      linkItems.youlink,
      linkItems.eccloud,
      linkItems.cly,
      linkItems.bap,
      linkItems.academy,
      linkItems.ykt,
      linkItems.ydz,
      linkItems.dudu,
      linkItems.ism,
      linkItems.pcos,
      linkItems.crm
    ]
  }, {
    name: "软件产品及解决方案",
    children: [{
      name: "用友NC6",
      aHref: "http://nc.yonyou.com/nc/product/nc.aspx"
    }, {
      name: "用友HCM",
      aHref: "http://nc.yonyou.com/nc/product/hcm.aspx"
    }, {
      name: "用友BQ",
      aHref: "http://nc.yonyou.com/nc/product/bq.aspx"
    }, {
      name: "用友U9",
      aHref: "http://nc.yonyou.com/nc/product/u9.aspx"
    }, {
      name: "用友iUAP",
      aHref: "http://nc.yonyou.com/nc/product/uap.aspx"
    }, {
      name: "解决方案",
      aHref: "http://nc.yonyou.com/nc/fangan.aspx"
    }]
  }, {
    name: "移动应用",
    children: [{
      name: linkItems.qyj.name,
      aHref: linkItems.qyj.introUrl
    }, {
      name: "其他",
      aHref: linkItems.app.siteUrl
    }]
  }];
}

var SubNavbarProduct = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      groupItems: getGroupItems()
    };
  },

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  handleUserInfoChange() {
    this.setState({
      groupItems: getGroupItems()
    });
  },

  renderGroupChildren(items) {
    var ret = null;
    var nodes = items.map(function(elem, index) {
      return (
        <li key={"gc_" + index} className="item"><a href={elem.aHref} target="_blank">{elem.name}</a></li>
      );
    });
    var length = items.length;
    for (var i = 0; i < length; i = i + 3) {
      var end = i + 3 > length ? length : i + 3;
      ret = [
        ret,
        <ul key={i} className="list-unstyled">
          {nodes.slice(i, end)}
        </ul>
      ];
    }
    return ret;
  },

  renderGroups() {
    var that = this;
    var nodes = this.state.groupItems.map(function(elem, index) {
      return (
        <li key={"g_" + index} className="group">
          <div className="title"><span>{elem.name}</span></div>
          <div className="items">
            {that.renderGroupChildren(elem.children)}
          </div>
        </li>
      );
    });
    return nodes;
  },

  render() {
    return (
      <ul className="subnav subnav-product list-inline">
        {this.renderGroups()}
      </ul>
    );
  }
});

module.exports = SubNavbarProduct;
