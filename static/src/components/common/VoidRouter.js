"use strict";
// 空路由，即不起作用的路由

var VoidRouter = React.createClass({
  statics: {
    willTransitionTo: function(transition) {
      transition.abort();
    }
  },

  render: function() {
    return <div></div>;
  }
});

module.exports = VoidRouter;
