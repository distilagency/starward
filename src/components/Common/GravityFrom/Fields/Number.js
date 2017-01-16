import React, { Component, PropTypes } from 'react';
import { numberValdation } from '../Helpers/validation';

export default class Number extends Component {
  static propTypes = {
    field: PropTypes.object,
    value: PropTypes.string,
    updateForm: PropTypes.func,
    submitSuccess: PropTypes.bool,
    submitFailed: PropTypes.bool,
    isValid: PropTypes.bool,
  };
  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.submitSuccess != nextProps.submitSuccess){
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event, field){
    const { id, isRequired } = field;
    const value = event.target ? event.target.value : null;
    const valid = numberValdation(isRequired, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { id, type, label, placeholder, isRequired, maxLength } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="text">
          <label>
            {label}{isRequired ? <abbr>*</abbr> : null}
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              maxLength={maxLength}
              required={isRequired}
              onChange={(event) => this.updateField(event, field)}
            />
          </label>
        </div>
      </div>
    );
  }
}
