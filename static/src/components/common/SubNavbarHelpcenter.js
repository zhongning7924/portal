"use strict";

import hcRouteConfig from "components/helpcenter/RouteConfig";
import url from "utils/Url";

var getItem = function(routeConfigItem) {
  return {
    name: routeConfigItem.name,
    aHref: url.getUrlByRoutePath(routeConfigItem.path)
  };
};

var items = [
  getItem(hcRouteConfig.user),
  getItem(hcRouteConfig.finance),
  getItem(hcRouteConfig.service)
];

var SubNavbarHelpcenter = React.createClass({
  render() {
    var nodes = items.map(function(elem, index) {
      return (
        <li key={"subnav_hc" + index} className="item">
          <a href={elem.aHref} target="_blank">{elem.name}</a>
        </li>
      );
    });
    return (
      <ul className="subnav subnav-helpcenter list-unstyled">
        {nodes}
      </ul>
    );
  }
});

module.exports = SubNavbarHelpcenter;
