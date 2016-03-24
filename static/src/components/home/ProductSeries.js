"use strict";

import {Grid, Row, Col} from "react-bootstrap";

var CloudProducts = require("./CloudProducts");
var MobileProducts = require("./MobileProducts");

var titleImg = require("images/home/title_product.jpg");

const ProductSeries = React.createClass({
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12} className="title-productseries"><img src={titleImg} alt="产品系列" className="img-responsive center-block"/></Col>
        </Row>
        <CloudProducts/>
        <MobileProducts/>
      </Grid>
    );
  }
});


module.exports = ProductSeries;
