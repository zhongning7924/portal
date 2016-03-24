"use strict";
import {Col} from "react-bootstrap";

var ExpTooltip = React.createClass({
  setTooltipClass() {
    if (this.props.items.btnstyle === "true") {
      return "exptooltip";
    }
    else {
      return "hideexptooltip";
    }
  },
  render() {
    return (
      <Col md={8} className="tooltipbox">
        <p className = {this.setTooltipClass()}> {this.props.items.spantext}
          <a href = {this.props.items.alink} target="_blank" >{this.props.items.atext}</a>
        </p>
      </Col>
		);
	}
});
module.exports = ExpTooltip;
