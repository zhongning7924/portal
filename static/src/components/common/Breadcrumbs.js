"use strict";

var contains = _.contains;

var Link = Router.Link;

var Breadcrumbs = React.createClass({
  propTypes: {
    nameCallback: React.PropTypes.func,
    separator: React.PropTypes.string,
    displayDefault: React.PropTypes.bool,
    displayMissing: React.PropTypes.bool,
    excludes: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function () {
    // 设置参数的默认值
    var separator = this.props.separator || " > ";
    var displayDefault = this.props.displayDefault || false;
    var displayMissing = this.props.displayMissing || false;
    var excludes = this.props.excludes || [];
    var nameCallback = this.props.nameCallback || function() {};

    var breadcrumbs = [];
    var _this = this;
    var routes = this.context.router.getCurrentRoutes();
    var params = this.context.router.getCurrentParams();

    // Convert Object to array (can sometimes happen)
    if (typeof routes === "object") {
      var routeArray = Object.keys(routes).map(function (key) {return routes[key]; });
      routes = routeArray;
    }

    // Iterate routes to set breadcrumbName and breadcrumbShow property
    routes.forEach(function (route) {
      var name, missingParams = false, show = true;

      // 获取导航名称
      name = nameCallback(route, params);
      if (typeof name === "undefined") {
        if (typeof route.name === "undefined") {
          name = "Missing name parameter in router";
          missingParams = true;
        } else {
          name = route.name;
        }
      } else if (typeof name === "function") {
        name = name(_this);
      }

      // 导航是否显示
      if (contains(excludes, route.name)) {
        show = false;
      }
      if (missingParams === true && !displayMissing) {
        show = false;
      }
      if (route.isDefault && !displayDefault) {
        show = false;
      }

      route.breadcrumbName = name;
      route.breadcrumbShow = show;
    });

    // Generate breadcrumbs
    routes.forEach(function (route, i, arr) {
      if (!route.breadcrumbShow) {
        return;
      }

      // Whether this is the last
      var last = true;
      for (var index = i + 1; index < arr.length; index++) {
        if (arr[index].breadcrumbShow) {
          last = false;
          break;
        }
      }

      var link = route.breadcrumbName;
      if (last) {
        separator = "";
      } else {
        link = React.createElement(
          Link,
          { to: typeof route.path === "undefined" ? "/" : route.path,
            params: params },
            route.breadcrumbName
        );
      }

      breadcrumbs.push(
        <span key={route.name + "" + breadcrumbs.length}>
          {link} {separator}
        </span>
      );
    });

    return <div className="breadcrumbs">{breadcrumbs}</div>;
  }
});

module.exports = Breadcrumbs;
