import React, { Component } from 'react';
import { websiteValdation } from '../Helpers/validation';

export default class Website extends Component {
  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.submitSuccess != nextProps.submitSuccess){
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event, field){
    const { id, required } = field;
    const value = event.target ? event.target.value : null;
    const valid = websiteValdation(required, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { id, type, label, placeholder, required, maxLength } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="text">
          <label>
            {label}{required ? <abbr>*</abbr> : null}
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              maxLength={maxLength}
              required={required}
              onChange={(event) => this.updateField(event, field)}
            />
          </label>
        </div>
      </div>
    );
  }
}
