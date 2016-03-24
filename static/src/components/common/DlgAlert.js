"use strict";

/**
 * 提示组件，用于替换浏览器的alert方法
 */
var Modal = ReactBS.Modal, Button = ReactBS.Button;

require("styles/less/dialog.less");

var DlgAlert = React.createClass({
  propTypes: {
    show: React.PropTypes.bool,
    content: React.PropTypes.string,
    closeCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      show: false,
      content: "",
      closeCallback: function() {}
    };
  },

  getInitialState: function() {
    return {
      show: false
    };
  },

  close: function() {
    this.setState({
      show: false
    });
    this.props.closeCallback();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      show: nextProps.show
    });
  },

  render: function() {
    return (
      <Modal className="hsy-dlg-sm" show={this.state.show} onHide={this.close} backdrop="static" animation={false}>
        <Modal.Body>{this.props.content}</Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" bsSize="small" onClick={this.close}>确定</Button>
        </Modal.Footer>
      </Modal>);
  }
});

module.exports = DlgAlert;
