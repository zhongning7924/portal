"use strict";

import url from "utils/Url";
var imgLogo = require("images/logo.png");

var Grid = ReactBS.Grid;
var SubpageHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <Grid fluid={true} className="hsy-subpage-header">
        <Grid>
          <div className="pull-left">
            <a href={url.portalIndexUrl}>
              <img src={imgLogo} alt="惠商云平台"/>
              <span className="title">{this.props.title}</span>
            </a>
          </div>
          <div className="pull-right">
            <a className="return-home" href={url.URL.home}>惠商云平台首页</a>
          </div>
        </Grid>
      </Grid>
    );
  }
});

module.exports = SubpageHeader;
