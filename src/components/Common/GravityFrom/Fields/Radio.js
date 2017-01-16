import React, { Component, PropTypes } from 'react';
import { radioValidation } from '../Helpers/validation';

export default class Radio extends Component {
  static propTypes = {
    field: PropTypes.object,
    value: PropTypes.string,
    updateForm: PropTypes.func,
    submitFailed: PropTypes.bool,
    submitSuccess: PropTypes.bool,
    isValid: PropTypes.bool,
  };
  componentWillMount() {
    this.initField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.submitSuccess != nextProps.submitSuccess){
      this.initField({target: null}, nextProps.field);
    }
  }
  initField(event, field){
    const { id, choices, placeholder, isRequired } = field;
    const default_value = choices.find(choice => choice.isSelected) ? choices.find(choice => choice.isSelected).value : null;
    const valid = radioValidation(isRequired, default_value);
    this.props.updateForm(default_value, id, valid);
  }
  updateField(event, field){
    const { id, choices, placeholder, isRequired } = field;
    const value = event.target.value;
    const valid = radioValidation(isRequired, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { choices, id, label, placeholder, isRequired } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="radios">
          <p className="title">{label}{isRequired ? <abbr>*</abbr> : null}</p>
          {choices.map((choice, index) => (
            <div className="radio" key={index}>
              <label>
                <input
                  type="radio"
                  name={id}
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
