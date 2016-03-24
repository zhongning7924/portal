/**
 * 帮助中心－当前位置导航
 **/
"use strict";

import Breadcrumbs from "components/common/Breadcrumbs";
import routeConfig from "./RouteConfig";

var breadcrumbNameCallback = function(route) {
  var path = route.path;
  for (var i in routeConfig) {
    if (path === routeConfig[i].path) {
      return routeConfig[i].name;
    }
  }
  return route.name;
};

var Location = React.createClass({
  render() {
    return (
      <div className="location">您当前的位置：
        <Breadcrumbs nameCallback={breadcrumbNameCallback}/>
      </div>
    );
  }
});

module.exports = Location;
