"use strict";
//分页公共组件
var Pagination = ReactBS.Pagination;
require("styles/less/paginationbasic.less");
var DlgAlert = require("./DlgAlert");

var PaginationBasic = React.createClass({
	//初始方法
  propTypes: {
    pageNum: React.PropTypes.number,
    totalNum: React.PropTypes.number,
    onSelFunc: React.PropTypes.func
  },
	getInitialState: function() {
		return {
      activePage: 1,
      showAlert: false
		};
  },
	//选择页码方法
	handleSelect: function(event, selectedEvent) {
    var pageIndex = selectedEvent.eventKey;
    if (pageIndex < 1 || pageIndex > this.props.pageNum) {
      return;
    }
    this.setState({
      activePage: pageIndex
    });
    this.props.onSelFunc(selectedEvent.eventKey);
	},
  closeAlert: function() {
    this.setShowAlert(false);
  },
  setShowAlert: function(res) {
    this.setState({
      showAlert: res
    });
  },
	//编辑到第n页触发方法
	onEditDest: function(event) {
		var target = event.target;
		var type = /^[0-9]*[1-9][0-9]*$/;
		var re = new RegExp(type);
      if (target.value.match(re) == null) {
          target.value = "";
          return;
      }
      if (target.value > this.props.pageNum) {
        this.setShowAlert(true);
        target.value = "";
          return;
      }
	},
	//确认
	onConfirmDest: function(event) {
    var target = event.target;
    var destNum = target.parentNode.getElementsByTagName("input")[0].value;
    if (destNum) {
      this.setState({
        activePage: parseInt(destNum)
      });
      this.props.onSelFunc(destNum);
    }
    else {
      return;
    }
	},
	render() {
		var that = this;
    var alertMsg = "最多只有" + this.props.pageNum + "页";
    return (
    <div className="row">
      <div className="col-md-3">
      <div className="div-before-page">共有{this.props.totalNum}条记录 </div>
      </div>
    <div className="col-md-6">
      <Pagination
        prev={true}
        next={true}
        first={true}
        last={true}
        ellipsis={true}
        items={this.props.pageNum}
        maxButtons={5}
        bsSize="small"
        activePage={this.state.activePage}
        onSelect={this.handleSelect}
          id="paginationBasic"/>
        </div>
        <div className="col-md-3">
          <div className="div-after-page">
            到第
            <input type="text" className="text-after-page"
              onKeyUp={that.onEditDest}>
            </input>
            页&nbsp;
            <button className="btn-after-page" onClick={that.onConfirmDest}>确定</button>
            <DlgAlert content={alertMsg} show={this.state.showAlert} closeCallback={this.closeAlert}/>
          </div>
        </div>
      </div>
    );
	}
});

module.exports = PaginationBasic;
