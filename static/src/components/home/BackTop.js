"use strict";
import classnames from "classnames";

function getCurScrollTop() {
  // 获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；
  // 因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
  return document.documentElement.scrollTop + document.body.scrollTop;
}
const BackTop = React.createClass({
  getInitialState() {
    return {
      hidden: true
    };
  },

  handleScroll() {
    var hidden = true;
    var curScrollTop = getCurScrollTop();
    if (curScrollTop >= document.documentElement.clientHeight) {
      hidden = false;
    }

    this.setState({
      hidden: hidden
    });
  },

  componentDidMount: function() {
    if (window.addEventListener) {
      window.addEventListener("scroll", this.handleScroll);
    } else if (window.attachEvent) {
      window.attachEvent("onscroll", this.handleScroll);
    }
  },

  componentWillUnmount: function() {
    if (window.addEventListener) {
      window.removeEventListener("scroll", this.handleScroll);
    } else if (window.attachEvent) {
      window.detachEvent("onscroll", this.handleScroll);
    }
  },

  handleClick(e) {
    e.preventDefault();

    var timer = setInterval(function() {
      var curScrollTop = getCurScrollTop();
      if (curScrollTop > 5) {
        var speedTop = curScrollTop / 5;
        window.scrollBy(0, -speedTop);
      } else {
        window.scrollBy(0, 0);
        clearInterval(timer);
      }
    }, 30);
  },

  render() {
    var className = classnames(["side-btn", "backtop", {"hidden": this.state.hidden}]);
    return (
      <div className={className} onClick={this.handleClick}>
        <a href="javacript:void(0);">
          <span className="icon">
            <i className="iconfont">&#xe60b;</i>
          </span>
        </a>
      </div>
    );
  }
});

module.exports = BackTop;
