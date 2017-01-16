import React, { Component, PropTypes } from 'react';
import { selectValidation } from '../Helpers/validation';

export default class Select extends Component {
  static propTypes = {
    field: PropTypes.object,
    value: PropTypes.string,
    updateForm: PropTypes.func,
    submitSuccess: PropTypes.bool,
    submitFailed: PropTypes.bool,
    isValid: PropTypes.bool,
  };
  componentWillMount() {
    this.initField({target: null}, this.props.field, this.props.value);
  }
  componentWillReceiveProps(nextProps){
    if(!this.props.submitSuccess && nextProps.submitSuccess){
      this.initField({target: null}, nextProps.field);
    }
  }
  initField(event, field, value){
    const { id, choices, placeholder, isRequired } = field;
    const default_value = this.getDefaultValue(choices, placeholder);
    const valid = selectValidation(isRequired, default_value, placeholder);
    this.props.updateForm(default_value, id, valid);
  }
  getDefaultValue(choices, placeholder, value){
    const selected_value = choices.find(choice => choice.isSelected);
    if(selected_value){
      return selected_value.value;
    }
    return placeholder ? placeholder : choices[0].value;
  }
  updateField(event, field){
    const { id, choices, placeholder, isRequired } = field;
    const value = event.target.value;
    const valid = selectValidation(isRequired, value, placeholder);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { choices, label, placeholder, isRequired } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="select">
          <label>
            {label}{isRequired ? <abbr>*</abbr> : null}
            <select required={isRequired} value={value} onChange={(event) => this.updateField(event, field)}>
              {placeholder ? <option disabled>{placeholder}</option> : null}
              {choices.map((choice, index) => <option key={index} value={choice.value}>{choice.text}</option>)}
            </select>
          </label>
        </div>
      </div>
    );
  }
}
