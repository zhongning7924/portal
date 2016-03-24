"use strict";

import {Grid, Row} from "react-bootstrap";

var bgImg = require("images/home/bg_experience.jpg");

const Experience = React.createClass({
  render() {
    return (
      <Grid fluid className="experience">
        <Row>
          <img src={bgImg} alt="" className="img-responsive center-block"/>
        </Row>
        <Row>
          <a className="exp-btn center-block" href="/portal/#/page/expcenter" target="_blank">立即体验</a>
        </Row>
      </Grid>
    );
  }
});

module.exports = Experience;
