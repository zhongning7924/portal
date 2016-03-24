"use strict";
import {Grid, Row, Col} from "react-bootstrap";
import ExpButton from "../experience/ExpButton";
import ExpTooltip from "../experience/ExpTooltip";

var wxitems = [ {
  name: "安全手表调研",
  img: require("images/experienceCenter/wl_watch.png")
  }, {
   name: "微酒店",
   img: require("images/experienceCenter/wl_hotel.png")
  }, {
   name: "微汽车",
   img: require("images/experienceCenter/wl_car.png")
  }, {
   name: "用友澳门微官网",
   img: require("images/experienceCenter/wl_macao.png")
  }, {
   name: "用友企业互联网",
   img: require("images/experienceCenter/wl_internet.png")
  }, {
   name: "云创新商城",
   img: require("images/experienceCenter/wl_cloudmall.png")
  }
];

var ExpContent = React.createClass({
  getInitialState() {
    return {
      issetstyle: this.props.items.btnstyle
    };
  },
	render() {
    var items = this.props.items;
		var itemNodes = wxitems.map(function(elem) {
      return (
        <img className="wximg pull-left" src={elem.img} alt={elem.name}/>
      );
    });
      return (
        <div className="prc-content">
          <Grid>
            <Row>
              <Col md={6} className="content-left">
              <img src={items.img} alt="" className="img-responsive center-block"/>
              </Col>
              <Col md={6} className="content-right">
                <p className="title"> {items.name} </p>
                <p className="text-explain"> {items.introText} </p>
                <Row>
                  <ExpButton items={items}/>
                  <ExpTooltip items={items}/>
                </Row>
                {items.cplb === "WL" ? {itemNodes} : ""}
              </Col>
            </Row>
          </Grid>
        </div>
      );
  }
});
module.exports = ExpContent;
