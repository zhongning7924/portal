"use strict";

var Header = require("./Header");
var Footer = require("./Footer");

var SubPage = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <Router.RouteHandler/>
        <Footer bgStyle="dark"/>
      </div>
    );
  }
});

module.exports = SubPage;
