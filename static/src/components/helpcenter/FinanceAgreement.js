/**
 * 帮助中心－财务问题－运营服务合同
 **/
"use strict";

import {Row, Col} from "react-bootstrap";
var FinanceAgreement = React.createClass({
  render() {
    return (
      <Row>
        <Col md={12}>
          <Row>
            <p>1.用友移动应用运营服务合同 <a href="/portal/helpcenterfiles/agreement.docx">点击下载</a></p>
          </Row>
        </Col>
      </Row>
    );
  }
});

module.exports = FinanceAgreement;
