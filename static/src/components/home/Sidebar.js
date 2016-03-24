"use strict";

import OnlineService from "./OnlineService";
import BackTop from "./BackTop";

const Sidebar = React.createClass({
  render() {
    return (
      <div className="hsy-sidebar">
        <OnlineService/>
        <BackTop/>
      </div>
    );
  }
});

module.exports = Sidebar;
