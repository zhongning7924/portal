"use strict";

var AuthStore = require("../stores/AuthStore");

var RestAPI = require("utils/RestAPI");

var requireAuth = function(Component) {
  var Authenticated = React.createClass({
    statics: {
      willTransitionTo: function(/*transition*/) {
        if (!AuthStore.loggedIn()) {
          // 跳转到登录认证界面
          RestAPI.oauth2Relogin();
          //transition.redirect("/login", {}, {"nextPath" : transition.path});
        }
      }
    },

    render: function() {
      return (<Component {...this.props}/>);
    }
  });

  return Authenticated;
};

module.exports = requireAuth;
