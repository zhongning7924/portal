function merge() {
  const ret = {};
  const args = [].slice.call(arguments, 0);
  args.forEach((a)=> {
    Object.keys(a).forEach((k)=> {
      ret[k] = a[k];
    });
  });
  return ret;
}

const FieldMixin = {
  setField(field, e) {
    let v = e;
    const target = e && e.target;
    if (target) {
      // no radio
      if ((target.nodeName + '').toLowerCase() === 'input' &&
        target.type === 'checkbox') {
        v = target.checked;
      } else {
        v = e.target.value;
      }
    }
    const newFormData = {};
    newFormData[field] = v;
    this.setState({
      formData: merge(this.state.formData, newFormData),
    });
  },

  onValidationStateChange(formStatus, formData) {
    this.setState({
      formStatus: merge(this.state.formStatus, formStatus),
      formData: merge(this.state.formData, formData),
    });
  },
};

export default FieldMixin;
