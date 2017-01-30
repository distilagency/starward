import React, { Component } from 'react';
import { radioValidation } from '../Helpers/validation';

export default class Radio extends Component {
  componentWillMount() {
    this.initField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submitSuccess !== nextProps.submitSuccess) {
      this.initField({target: null}, nextProps.field);
    }
  }
  initField(event, field) {
    const { id, choices, required } = field;
    const defaultValue = choices.find(choice => choice.isSelected) ? choices.find(choice => choice.isSelected).value : null;
    const valid = radioValidation(required, defaultValue);
    this.props.updateForm(defaultValue, id, valid);
  }
  updateField(event, field) {
    const { id, required } = field;
    const value = event.target.value;
    const valid = radioValidation(required, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { choices, label, required } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="radios">
          <p className="title">{label}{required ? <abbr>*</abbr> : null}</p>
          {choices.map((choice, index) => (
            <div className="radio" key={index}>
              <label htmlFor={choice.id}>
                <input
                  type="radio"
                  name={choice.id}
                  value={choice.value}
                  defaultChecked={choice.isSelected}
                  checked={value === choice.value}
                  onChange={(event) => this.updateField(event, field)}
                />
                {choice.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
