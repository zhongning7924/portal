"use strict";
var Option = React.createClass({
  render() {
  var optionId = this.props.options.id;
  var optionVal = this.props.options.value;
  var defaultId = this.props.defaultId;
    return (
      <div>
        {defaultId === optionId ?
          (<option id={optionId} value={optionId} selected="selected"> {optionVal}
          </option>) :
          (<option id={optionId} value={optionId} > {optionVal}
          </option>)}
      </div>
    );
  }

});
var SelectOption = React.createClass({
  render() {
    var defaultId = this.props.defaultId;
    var options = this.props.options.map(function(optionData) {
      return (
        <Option options={optionData} name={optionData.name} defaultId={defaultId}/>
      );
    });
    return (
      <select className="form-control sr" name={this.props.name}>
        {options}
      </select>
    );
  }

});
module.exports = SelectOption;
