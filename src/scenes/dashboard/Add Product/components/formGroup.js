import React, { Component } from "react";
import PropTypes from "prop-types";

export class FormGroup extends Component {
  render() {
    let inputId = this.props.id;
    let inputName = this.props.name;
    let inputType = this.props.type;
    let inputOnChange = this.props.onChange;

    switch (inputType) {
      case "file":
        return (
          <div className="form-group col-sm-6">
            <input
              type={`${inputType}`}
              id={`${inputId}`}
              accept="image/*"
              onChange={inputOnChange}
              multiple
              required
            />
          </div>
        );
      case "number":
        return (
          <div className="col-4 form-group">
            <input
              type={`${inputType}`}
              name={`${inputName}`}
              id={`${inputId}`}
              className="form-control"
              placeholder={`${inputName}`}
              onChange={inputOnChange}
              required
            />
          </div>
        );
      default:
        return (
          <div className="col-sm-6 form-group">
            <input
              type={`${inputType}`}
              name={`${inputName}`}
              id={`${inputId}`}
              className="form-control"
              placeholder={`${inputName}`}
              onChange={inputOnChange}
              required
            />
          </div>
        );
    }
  }
}

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
