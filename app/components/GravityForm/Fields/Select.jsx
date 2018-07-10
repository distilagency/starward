import React, { Component } from 'react';
import { selectValidation } from '../Helpers/validation';

export default class Select extends Component {
  componentWillMount() {
    this.initField({target: null}, this.props.field, this.props.value);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.submitSuccess && nextProps.submitSuccess) {
      this.initField({target: null}, nextProps.field);
    }
  }
  getDefaultValue(choices, placeholder) {
    const selectedValue = choices.find(choice => choice.isSelected);
    if (selectedValue) {
      return selectedValue.value;
    }
    return placeholder ? placeholder : choices[0].value;
  }
  initField(event, field) {
    const { id, choices, placeholder, required } = field;
    const defaultValue = this.getDefaultValue(choices, placeholder);
    const valid = selectValidation(required, defaultValue, placeholder);
    this.props.updateForm(defaultValue, id, valid);
  }
  updateField(event, field) {
    const { id, placeholder, required } = field;
    const value = event.target.value;
    const valid = selectValidation(required, value, placeholder);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { id, choices, label, classes, placeholder, required } = field;
    return (
      <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
        <div className="select">
          <label htmlFor={id}>
            {label}{required ? <abbr>*</abbr> : null}
            <select name={id} required={required} value={value || ''} onChange={(event) => this.updateField(event, field)}>
              {placeholder ? <option disabled>{placeholder}</option> : null}
              {choices.map((choice, index) => <option key={index} value={choice.value}>{choice.text}</option>)}
            </select>
          </label>
        </div>
      </div>
    );
  }
}
