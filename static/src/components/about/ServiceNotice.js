
"use strict";
import GetNoticeListStore from "stores/GetNoticeListStore";
import GetNoticeListActions from "actions/GetNoticeListActions";
import url from "utils/Url";
import PaginationBasic from "../common/PaginationBasic";
// import {Grid, Row, Col} from "react-bootstrap";
var start = 0;
var size = 20;
var ServiceNotice = React.createClass({
  mixins: [Reflux.ListenerMixin],
  handleNoticeListChange() {
    this.setState({
      noticeList: GetNoticeListStore.getNoticeList(),
      totalNum: this.getTotalNum(),
      pageNum: this.getPageNum()
    });
  },

  componentWillMount() {
    GetNoticeListActions.GetNoticeList.trigger(start, size);
    this.listenTo(GetNoticeListStore, this.handleNoticeListChange);
  },
  getInitialState() {
    return {
      noticeList: null,
      totalNum: this.getTotalNum(),
      pageNum: this.getPageNum()
    };
  },
  setNoticeList() {
    this.setState({
      totalNum: this.getTotalNum(),
      pageNum: this.getPageNum()
      // marketActivityList: this.getMarketActivityList()
    });
  },
     //页码选择
  onSelFunc (pageIndex) {
    start = (pageIndex - 1) * size;
    GetNoticeListActions.GetNoticeList.trigger(start, size);
    this.listenTo(GetNoticeListStore, this.setNoticeList);
     this.setState({
      noticeList: GetNoticeListStore.getNoticeList()
    });
  },
  //获取总数
  getTotalNum() {
    var data = 0;
    var noticedata = GetNoticeListStore.getNoticeList();
    if (noticedata) {
     data = noticedata.totalItemNum;
    }
    return data;
  },
   //获取分页页数
  getPageNum() {
    var pageNum = 0;
    pageNum = Math.ceil(this.getTotalNum() / size);
    return pageNum;
  },
  render() {
    var that = this;
    var notices = this.state.noticeList;
    var noticeDetailurl = url.URL.aboutDetail;
    var itemNodes = notices === null ? "" : notices.items.map(function(elem) {
      var DetailUrl = noticeDetailurl + "?ID=" + elem.id;
      return (
        <p><a href={DetailUrl}>{elem.title} ({elem.updatetime})</a></p>
      );
    });
    return (
      <div className="servicenotice">
        <h3 className="">服务公告</h3>
        <p className="gglist">公告列表</p>
        <p className="hrline"></p>
        {itemNodes}
        <div>
         <PaginationBasic pageNum={this.state.pageNum} totalNum={this.state.totalNum}
            onSelFunc={that.onSelFunc}/>
        </div>
      </div>
    );
  }
});

module.exports = ServiceNotice;
