var isPlaceholderSupported =    (typeof document !== 'undefined')
                             && 'placeholder' in document.createElement('input');
var classNames = require("classnames");
var FormGroup = require("react-bootstrap/lib/FormGroup");

var InputPlaceholderShim = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.node,
    help: React.PropTypes.node,
    addonBefore: React.PropTypes.node,
    addonAfter: React.PropTypes.node,
    buttonBefore: React.PropTypes.node,
    buttonAfter: React.PropTypes.node,
    bsSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
    bsStyle: React.PropTypes.oneOf(['success', 'warning', 'error']),
    hasFeedback: React.PropTypes.bool,
    feedbackIcon: React.PropTypes.node,
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    groupClassName: React.PropTypes.string,
    wrapperClassName: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    value: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      disabled: false,
      hasFeedback: false,
      multiple: false
    };
  },

  getInitialState() {
    return {
      showPlaceholder: true
    }
  },

  getInputDOMNode() {
    return React.findDOMNode(this.refs.input);
  },

  getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      }
      return this.getInputDOMNode().value;
    }
    throw new Error('Cannot use getValue without specifying input type.');
  },

  getChecked() {
    return this.getInputDOMNode().checked;
  },

  getSelectedOptions() {
    let values = [];

    Array.prototype.forEach.call(
      this.getInputDOMNode().getElementsByTagName('option'),
      (option) => {
        if (option.selected) {
          let value = option.getAttribute('value') || option.innerHtml;
          values.push(value);
        }
      });

    return values; 
  },

  isCheckboxOrRadio() {
    return this.props.type === 'checkbox' || this.props.type === 'radio';
  },

  isFile() {
    return this.props.type === 'file';
  },

  renderInput() {
    if (!this.props.type) {
      return this.props.children;
    }

    switch (this.props.type) {
    case 'select':
      return (
        <select {...this.props} className={classNames(this.props.className, 'form-control')} ref="input" key="input">
          {this.props.children}
        </select>
      );
    case 'textarea':
      return <textarea {...this.props} className={classNames(this.props.className, 'form-control')} ref="input" key="input" />;
    case 'static':
      return (
        <p {...this.props} className={classNames(this.props.className, 'form-control-static')} ref="input" key="input">
          {this.props.value}
        </p>
      );
    default:
      const className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
      return <input {...this.props} className={classNames(this.props.className, className)} ref="input" key="input" />;
    }
  },

  handleHolderClick(e) {
    this.setState({
      showPlaceholder: false
    });
    this.getInputDOMNode().focus();
  },

  handleInputFocus(e) {
    if (this.state.showPlaceholder) {
      this.setState({
        showPlaceholder: false
      });
    }
  },

  handleInputBlur(e) {
    if (!this.getInputDOMNode().value) {
      this.setState({
        showPlaceholder: true
      });
    }
  },

  renderFormGroup(children) {

    // 如果浏览器不支持placeholder，生成placeholder元素
    if(!isPlaceholderSupported && this.props.placeholder) {
      children = React.cloneElement(children, {
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur});
      const className = this.state.showPlaceholder ? "" : "hidden";
      let shim = (<div className="input-placeholder-wrapper">
        {children}
        <span ref="inputPlaceholder"
          onClick={this.handleHolderClick}
          className={classNames("input-placeholder", className)}>
          {this.props.placeholder}
        </span>
      </div>);

      return <FormGroup {...this.props}>{shim}</FormGroup>;
    } else {
      return <FormGroup {...this.props}>{children}</FormGroup>; 
    }
  },

  render() {
    let children = this.renderInput();
    return this.renderFormGroup(children);
  },
});


module.exports = InputPlaceholderShim;
