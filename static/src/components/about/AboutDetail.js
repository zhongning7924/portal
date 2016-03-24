"use strict";

import Navbar from "../common/Navbar";
import {Grid} from "react-bootstrap";
import url from "utils/Url";
import GetNoticeListStore from "stores/GetNoticeListStore";
import GetNoticeListActions from "actions/GetNoticeListActions";
require("styles/less/navbar.less");
var noticeURL = url.URL.about + "/notice";
var title = null;
var date = null;
var detailContent = null;
var AboutDetail = React.createClass({
  mixins: [Reflux.ListenerMixin],
  handleNoticeListChange() {
    this.setState({
      noticeDetail: GetNoticeListStore.getNoticeDetail()
    });
  },
  componentWillMount() {
    GetNoticeListActions.GetNoticeDetail.trigger(this.getData());
    this.listenTo(GetNoticeListStore, this.handleNoticeListChange);
  },
  getInitialState() {
    return {
      noticeDetail: null
    };
  },
  getData() {
    return window.location.hash.split("?")[1].substring(3);
  },
  getDetail(detail) {
    title = detail.title;
    date = detail.createtime;
    detailContent = detail.map.content;
  },
  setstyle() {
    return window.screen.height;
  },
  render() {
    var minheight = {
      "min-height": window.screen.height - 400
    };
    var noticedetail = this.state.noticeDetail;
    var getcontentdata = noticedetail === null ? "" : this.getDetail(noticedetail);
    return (
      <div>
        <Navbar/>
        <div className="hsy-aboutdetail">
          <Grid className="detail-content">
            <div className="detail-location">
              <span>您当前的位置: <a href={noticeURL}>服务公告</a>
                 <span>>{title}</span>
              </span>
            </div>
            <div style={minheight}  className="aboutdetail-content">
              <h3 className="title">{title}</h3>
              <p className="date">{date}</p>
              <p className="hrline"></p>
              <div className="content-text" dangerouslySetInnerHTML={{__html: detailContent}} />
            </div>
          </Grid>
        </div>
      </div>
    );
  }
});

module.exports = AboutDetail;
