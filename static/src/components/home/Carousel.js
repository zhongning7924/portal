"use strict";

import {Carousel, CarouselItem} from "react-bootstrap";
import AuthStore from "stores/AuthStore";
import LinkItemConfig from "components/common/LinkItemConfig";

function getCarouselItems() {
  var linkItems = LinkItemConfig.getLinkItems();
  return [
    linkItems.eccloud,
    linkItems.qyj,
    linkItems.welink,
    linkItems.youlink,
    linkItems.api
  ];
}

const HSCarousel = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return {
      carouselItems: getCarouselItems()
    };
  },

  componentDidMount() {
    this.listenTo(AuthStore, this.handleUserInfoChange);
  },

  handleUserInfoChange() {
    this.setState({
      carouselItems: getCarouselItems()
    });
  },

  render() {
    var carouselItemNodes = this.state.carouselItems.map(function(elem, index) {
      return (
        <CarouselItem key={"carousel_" + index}>
          <a href={elem.aHref} target="_blank">
            <img className="img-responsive center-block" alt={elem.name} src={elem.carouselImg}/>
          </a>
        </CarouselItem>
      );
    });
    return (
      <Carousel>
        {carouselItemNodes}
      </Carousel>
    );
  }
});

module.exports = HSCarousel;
