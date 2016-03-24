"use strict";

import {Grid, Row, Col} from "react-bootstrap";

var titleImg = require("images/home/title_partners.jpg");

var items = [{
  name: "广州日报",
  img: require("images/home/logo_gzrb.jpg")
}, {
  name: "北元集团",
  img: require("images/home/logo_byjt.jpg")
}, {
  name: "海尔",
  img: require("images/home/logo_haier.jpg")
}, {
  name: "苏宁电器",
  img: require("images/home/logo_sndq.jpg")
}, {
  name: "中国联通",
  img: require("images/home/logo_zglt.jpg")
}, {
  name: "中国南车",
  img: require("images/home/logo_zgnc.jpg")
}, {
  name: "万科",
  img: require("images/home/logo_wk.jpg")
}, {
  name: "华大城",
  img: require("images/home/logo_hdc.jpg")
}, {
  name: "特变电工",
  img: require("images/home/logo_tbdg.jpg")
}, {
  name: "中国人保寿险",
  img: require("images/home/logo_zgrs.jpg")
}];

const Partners = React.createClass({
  render() {
    var itemNodes = items.map(function(elem, index) {
      return (
        <li key={"pn_" + index}>
          <img className="img-responsive center-block" src={elem.img} alt={elem.name}/>
        </li>
      );
    });

    return (
      <Grid className="partners">
        <Row>
          <Col sm={12} className="title-partners"><img src={titleImg} alt="合作伙伴" className="img-responsive center-block"/></Col>
        </Row>
        <Row><ul className="list-inline">{itemNodes}</ul></Row>
      </Grid>
    );
  }
});


module.exports = Partners;
