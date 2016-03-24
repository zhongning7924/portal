
import AsyncValidate from 'async-validator';
import Validator from './Validator';
import assign from 'object-assign';

let actionId = 0;

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.validators = {};
    ['attachValidator', 'detachValidator', 'onInputChangeSilently', 'onInputPrompt', 'onInputValidateBegin'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
  }

  onInputChangeSilently(validator, value) {
    const result = this.getValidationState();
    result.formData[validator.getName()] = value;
    this.props.onValidationStateChange(result.formStatus, result.formData);
  }

  onInputPrompt(validator) {
    const result = this.getValidationState();
    this.props.onValidationStateChange(result.formStatus, result.formData);
  }

  onInputValidateBegin(validator, v, fn) {
    let value = v;
    const name = validator.getName();
    const schema = this.getSchema(validator);
    const rules = schema[name];
    rules.forEach((rule, index) => {
      if (rule && rule.transform) {
        value = rule.transform(value);
        const newRule = assign({}, rule);
        newRule.transform = null;
        rules[index] = newRule;
      }
    });

    if (!value && validator.props.require && validator.props.warnIfRequire) {
      validator.valid = false;
      validator.warn = validator.props.message.warn;
      const result = this.getValidationState();
      result.formData[name] = value;
      this.props.onValidationStateChange(result.formStatus, result.formData);
      if (fn) {
        fn();
      }
      return;
    } else if (rules.length === 0) {
      //没有校验规则
      validator.valid = true;
      const result = this.getValidationState();
      result.formData[name] = value;
      this.props.onValidationStateChange(result.formStatus, result.formData);
      if (fn) {
        fn();
      }
      return;
    }

    const values = {};
    values[name] = value;
    validator.isValidating = true;
    validator.dirty = true;
    const currentActionId = actionId;
    validator.actionId = currentActionId;
    actionId++;

    const result = this.getValidationState();
    result.formData[name] = value;
    this.props.onValidationStateChange(result.formStatus, result.formData);
    
    const self = this;
    new AsyncValidate(schema).validate(values, (errors)=> {
      const validators = self.validators;
      // in case component is unmount and remount
      const nowValidator = validators[name];
      // prevent concurrency call
      if (nowValidator && nowValidator.actionId === currentActionId) {
        if (errors) {
          validator.error = errors[0].message;
        } else {
          validator.valid = true;
        }
        validator.isValidating = false;
        validator.dirty = false;
        const r = self.getValidationState();
        r.formData[name] = value;
        self.props.onValidationStateChange(r.formStatus, r.formData);
        if (fn) {
          fn();
        }
      }
    });
  }

  getSchema(validator) {
    const ret = {};
    let rules = validator.props.rules;
    if (rules) {
      if (Array.isArray(rules)) {
        rules = rules.concat();
      } else {
        rules = [rules];
      }
    } else {
      rules = [];
    }
    ret[validator.getName()] = rules;
    return ret;
  }

  getValidationState() {
    const formData = {};
    const formStatus = {};
    const validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      const validator = validators[name];
      formStatus[name] = {
        error: validator.error,
        isValidating: validator.isValidating,
        prompt: validator.prompt,
        warn: validator.warn,
        valid: validator.valid
      };
      formData[name] = validator.getValue();
    });
    return {
      formData: formData,
      formStatus: formStatus,
    };
  }

  render() {
    return <div className={this.props.className}>{this.attachValidators(this.props.children)}</div>;
  }

  isValid() {
    const result = this.getValidationState().formStatus;
    return Object.keys(result).every((name)=> {
      if (result[name].isValidating || !result[name].valid) {
        return false;
      }
      return true;
    });
  }

  attachValidators(children) {
    const self = this;
    if (children) {
      // refer: React traverseAllChildrenImpl
      // bug fix for react 0.13 @2015.07.02
      // option should not have non-text children
      // <option>11</option>
      // React.Children.map(option.props.children,function(c){return c}) => {'.0':'11'}
      const type = typeof children;
      if (type === 'boolean') {
        return children;
      }
      if (type === 'string' || type === 'number') {
        return children;
      }
      const childrenArray = [];
      const ret = React.Children.map(children, (c)=> {
        let child = c;
        if (React.isValidElement(child)) {
          if (child.type === Validator) {
            child = React.cloneElement(child, {
              attachValidator: self.attachValidator,
              detachValidator: self.detachValidator,
              onInputValidateBegin: self.onInputValidateBegin,
              onInputPrompt: self.onInputPrompt,
              onInputChangeSilently: self.onInputChangeSilently
            });
          } else if (child.props) {
            child = React.cloneElement(child, {}, self.attachValidators(child.props.children));
          }
        }
        childrenArray.push(child);
        return child;
      });
      // if only one child, then flatten
      if (childrenArray.length === 1) {
        return childrenArray[0];
      }
      return ret;
    }
    return children;
  }

  attachValidator(validator) {
    const name = validator.getName();
    this.validators[name] = validator;
  }

  detachValidator(validator) {
    delete this.validators[validator.getName()];
  }

  forceValidate(fs, callback) {
    let fields = fs;
    // must async to allow state sync
    setTimeout(()=> {
      const self = this;
      const validators = this.validators;
      let validator;
      let doing = 0;

      fields = fields || Object.keys(validators);
      const count = fields.length;
      if (count === 0) {
        callback(self.isValid());
        return;
      }

      function track() {
        doing++;
        if (doing === count) {
          if (callback) {
            callback(self.isValid());
          }
        }
      }

      fields.forEach((name)=> {
        validator = validators[name];
        self.onInputValidateBegin(validator, validator.getValue(), track);
      });
    }, 0);
  }

  validate(callback) {
    const self = this;
    const validators = this.validators;
    let count = 0;
    let validator;
    let doing = 0;

    Object.keys(validators).forEach((name)=> {
      validator = validators[name];
      if (validator.dirty) {
        count++;
      }
    });

    if (count === 0) {
      callback(self.isValid());
      return;
    }

    function track() {
      doing++;
      if (doing === count) {
        callback(self.isValid());
      }
    }

    Object.keys(validators).forEach((name)=> {
      validator = validators[name];
      if (validator.dirty) {
        this.onInputValidateBegin(validator, validator.getValue(), track);
      }
    });
  }

  reset() {
    const validators = this.validators;
    Object.keys(validators).forEach((name)=> {
      validators[name].reset();
    });
  }
}

Validation.propTypes = {
  onValidationStateChange: React.PropTypes.func,
  className: React.PropTypes.string,
  children: React.PropTypes.any
};

Validation.defaultProps = {
  onValidationStateChange() {
  }
};

Validation.Validator = Validator;

import FieldMixin from './FieldMixin';

Validation.FieldMixin = FieldMixin;

export default Validation;
