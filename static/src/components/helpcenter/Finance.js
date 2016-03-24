/**
 * 帮助中心－财务问题
 **/
"use strict";

import {Grid, Row, Col} from "react-bootstrap";
import MultiLevelMenu from "components/common/MultiLevelMenu";
import Location from "./Location";
import routeConfig from "./RouteConfig";

function getMenuItem(routeConfigItem) {
  return {
    name: routeConfigItem.name,
    linkTo: routeConfigItem.pathName
  };
}

var rootMenuItem = getMenuItem(routeConfig.finance);
rootMenuItem.children = [
  getMenuItem(routeConfig.financeBilling),
  getMenuItem(routeConfig.financeRecharge),
  getMenuItem(routeConfig.financeAgreement)
];

var Finance = React.createClass({
  render() {
    return (
      <Grid>
          <Location/>
          <Row className="hc-content">
          <Col md={2} xs={3}>
            <MultiLevelMenu menuItems={[rootMenuItem]}/>
          </Col>
          <Col md={10} xs={9} className="content">
            <Router.RouteHandler/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Finance;
