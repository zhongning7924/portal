"use strict";
import SelectOption from "./SelectOption";
var SelectComp = React.createClass({
  render() {
    var defaultId = this.props.defaultId;
    return (
      <div className="form-group">
        <label className="col-sm-3 control-label">{this.props.label}</label>
        <div className="col-sm-4">
        {this.props.edit ?
          (<SelectOption options={this.props.options} name={this.props.name} defaultId={defaultId}/>) :
          (<span id={this.props.id} name={this.props.name} className="form-control-text form-control-space" >{this.props.defaultVal}</span>)}
        </div>
      </div>
    );
  }

});
module.exports = SelectComp;
