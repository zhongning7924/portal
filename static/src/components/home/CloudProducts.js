"use strict";

import {Row, Col} from "react-bootstrap";
import AuthStore from "stores/AuthStore";
import LinkItemConfig from "components/common/LinkItemConfig";

var titleImg = require("images/home/line_cloud.jpg");

function getProductItems() {
  var linkItems = LinkItemConfig.getLinkItems();
  return [
    linkItems.welink,
    linkItems.eccloud,
    linkItems.cly,
    linkItems.academy,
    linkItems.youlink,
    linkItems.ykt,
    linkItems.bap,
    linkItems.dudu
  ];
}

const CloudProducts = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      productItems: getProductItems()
    };
  },

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  handleUserInfoChange() {
    this.setState({
      productItems: getProductItems()
    });
  },

  render() {
    var productItemNodes = this.state.productItems.map(function(elem, index) {
      return (
        <Col key={"prod_" + index} md={3} sm={4} xs={6} className="cell-product">
          <a href={elem.aHref} target="_blank">
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
          <Col sm={12} className="title-productgroup">
            <img src={titleImg} alt="云服务" className="img-responsive center-block"/>
          </Col>
        </Row>
        <Row>
         {productItemNodes}
        </Row>
      </div>
    );
  }
});

module.exports = CloudProducts;
