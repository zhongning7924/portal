/**
 * 帮助中心－用户指南
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

var routeMenuItem = getMenuItem(routeConfig.user);
routeMenuItem.children = [
  getMenuItem(routeConfig.userAccount),
  getMenuItem(routeConfig.userAgreement)
];

var User = React.createClass({
  render() {
    return (
      <Grid>
        <Location/>
        <Row className="hc-content">
          <Col md={2} xs={3}>
            <MultiLevelMenu menuItems={[routeMenuItem]}/>
          </Col>
          <Col md={10} xs={9} className="content">
            <Router.RouteHandler/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = User;
