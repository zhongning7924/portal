/**
 * 多级菜单
 **/
"use strict";

var Link = Router.Link;

var MultiLevelMenu = React.createClass({
  propTypes: {
    menuItems: React.PropTypes.array
  },

  getDefaultProps() {
    return [];
  },

  renderMenu(items, level) {
    var that = this;
    return items.map(function(elem, index) {
      var child = null;
      if (_.isArray(elem.children) && elem.children.length > 0) {
        var childNodes = that.renderMenu(elem.children, level++);
        child = <ul className="list-unstyled">{childNodes}</ul>;
      }

      return (
        <li key={"mn_" + level + index}>
          <Link to={elem.linkTo}>{elem.name}</Link>
          {child}
        </li>
      );
    });
  },

  render() {
    var node = this.renderMenu(this.props.menuItems, 0);
    var className = "hsy-menu list-unstyled";
    return (
      <ul className={className}>
        {node}
      </ul>
    );
  }
});

module.exports = MultiLevelMenu;
