"use strict";
import {Col} from "react-bootstrap";
var RestAPI = require("utils/RestAPI");
import AuthStore from "stores/AuthStore";

var ExpButton = React.createClass({
  handleOpenWlink() {
    var carrierDomain = AuthStore.getcarrierDomain();
    RestAPI.request({
      url: RestAPI.URL.CREATEUSERTEST,
      method: "POST",
      send: { "carrierDomain": carrierDomain, "appkeys": "wl000", "testday": "60"},
        successCallback: function(data) {
          // window.location.href = "http://welink.yonyou.com";
        },
        errorCallback: function(res) {
        }
    });
  },
  setClassName() {
     if (this.props.items.btnstyle === "false") {
       return "btnlink";
     }
     else {
       return "btnlinkdisabled";
     }
  },
  render() {
   var wl = null;
   if (this.props.items.isNeedOpen === "true") {
       wl = (<a onClick={this.handleOpenWlink} className="btnlink" href={this.props.items.href} target="_blank" >{this.props.items.btntext} </a>);
    }
    return (
      <Col md={3}>
        {this.props.items.isNeedOpen === "true" ? {wl} : <a className= {this.setClassName()} href={this.props.items.href} target="_blank">{this.props.items.btntext}</a>}
      </Col>
		);
	}
});
module.exports = ExpButton;
