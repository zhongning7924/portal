"use strict";

import {Row, Col} from "react-bootstrap";
import LinkItemConfig from "components/common/LinkItemConfig";

var titleImg = require("images/home/line_mobile.jpg");

const MobileProducts = React.createClass({
  getInitialState() {
    var linkItems = LinkItemConfig.getLinkItems();
    return {
      productItems: [
        linkItems.qyj,
        linkItems.mobilecrm,
        linkItems.mobilesale,
        linkItems.mobileqdbf
      ]
    };
  },

  render() {
    var productItemNodes = this.state.productItems.map(function(elem, index) {
      return (
        <Col key={"mob_" + index} md={3} sm={4} xs={6} className="cell-product">
          <a href={elem.introUrl} target="_blank">
            <img className="img-responsive center-block" alt={elem.name} src={elem.introImg}/>
            <div className="intro">
              <div className="title">{elem.name}</div>
              <div className="pop-text">{elem.introText}</div>
            </div>
          </a>
        </Col>
      );
    });
    return (
      <div>
        <Row>
          <Col sm={12} className="title-productgroup mobile">
            <img src={titleImg} alt="移动应用" className="img-responsive center-block"/>
          </Col>
        </Row>
        <Row>
         {productItemNodes}
        </Row>
      </div>
    );
  }
});

module.exports = MobileProducts;
