import {createChainedFunction} from 'rc-util';

function getValueFromEvent(e) {
  // support custom element
  return e.target ? e.target.value : e;
}

function hasPlaceholder(child) {
  return child.type === 'input' && !!child.props.placeholder;
}

function ieGT9() {
  if (typeof document === undefined) {
    return false;
  }
  const documentMode = document.documentMode || 0;
  return documentMode > 9;
}

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
    ['onValidateBegin', 'onPrompt', 'onChangeSilently', ].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  reset() {
    // 验证显示相关属性重置
    this.prompt = undefined;
    this.warn = undefined;
    this.valid = undefined;
    this.error = undefined;

    this.dirty = true;
    this.isValidating = false;
    // in case component is unmount and remount
    this.actionId = -1;
  }

  getInputElement() {
    return React.Children.only(this.props.children);
  }

  onChangeSilently(e) {
    this.props.onInputChangeSilently(this, getValueFromEvent(e));
  }

  onValidateBegin(e) {
    // keep last error
    //this.dirty = true;
    //this.isValidating = false;
    this.reset();
    this.props.onInputValidateBegin(this, getValueFromEvent(e));
  }

  onPrompt(e) {
    this.reset();
    this.prompt = this.props.message.prompt;
    this.props.onInputPrompt(this);
  }

  getName() {
    return this.getInputElement().props.name;
  }

  getValue() {
    return this.getInputElement().props.value;
  }

  render() {
    const props = this.props;
    const child = this.getInputElement();
    const validateTrigger = props.validateTrigger;
    const promptTrigger = props.promptTrigger;
    const extraProps = {};
    // keep model updated
    if (validateTrigger !== 'onChange') {
      extraProps.onChange = createChainedFunction(child.props.onChange, this.onChangeSilently);
    }
    extraProps[validateTrigger] = createChainedFunction(child.props[validateTrigger], this.onValidateBegin);
    if (promptTrigger && promptTrigger !== validateTrigger) {
      extraProps[promptTrigger] = createChainedFunction(child.props[promptTrigger], this.onPrompt);
    }
    if (hasPlaceholder(child) && ieGT9()) {
      // https://github.com/react-component/form-validation/issues/13
      extraProps.placeholder = undefined;
    }
    return React.cloneElement(child, extraProps);
  }

  componentDidMount() {
    this.props.attachValidator(this);
  }

  componentDidUpdate() {
    this.props.attachValidator(this);
  }

  componentWillUnmount() {
    this.props.detachValidator(this);
  }
}

Validator.defaultProps = {
  require: false,
  warnIfRequire: true,
  validateTrigger: "onBlur",
  promptTrigger: "onFocus",
  message: {
    prompt: "",
    warn: "",
    error: "",
    valid: ""
  }
};

Validator.propTypes = {
  attachValidator: React.PropTypes.func,
  detachValidator: React.PropTypes.func,
  onInputChangeSilently: React.PropTypes.func,
  onInputValidateBegin: React.PropTypes.func,
  onInputPrompt: React.PropTypes.func,
  require: React.PropTypes.bool,  // 是否必填
  warnIfRequire: React.PropTypes.bool,  // 是否给出必填警告
  validateTrigger: React.PropTypes.string, // 触发校验，引发必填警告或错误
  promptTrigger: React.PropTypes.string,    // 触发输入提示
  message: React.PropTypes.object // 不同校验状态的信息提示
};

export default Validator;
