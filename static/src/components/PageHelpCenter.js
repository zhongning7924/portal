"use strict";
import HCNavbar from "./helpcenter/Navbar";

require("styles/less/helpcenter.less");

var PageHelpCenter = React.createClass({
  render() {
    return (
      <div className="hsy-helpcenter">
        <HCNavbar/>
          <Router.RouteHandler/>
      </div>
    );
  }
});

module.exports = PageHelpCenter;
