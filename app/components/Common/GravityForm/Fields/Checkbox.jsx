import React, { Component } from 'react';
import { checkboxValidation } from '../Helpers/validation';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { values: []};
  }
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
    const defaultValues = choices.filter(choice => choice.isSelected);
    const valid = checkboxValidation(required, defaultValues);
    this.setState({values: defaultValues});
    this.props.updateForm(defaultValues, id, valid);
  }
  updateField(event, field) {
    const { id, required } = field;
    const value = event.target.value;
    const selectedValues = this.state.values;
    const valueIndex = selectedValues.indexOf(value);
    if (valueIndex < 0) {
      selectedValues.push(event.target.value);
    } else {
      selectedValues.splice(valueIndex, 1);
    }
    const valid = checkboxValidation(required, selectedValues);
    this.setState({values: selectedValues});
    this.props.updateForm(selectedValues, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { choices, label, required } = field;
    const values = value ? value.map(val => val.value) : [];
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="checkboxes">
          <p className="title">{label}{required ? <abbr>*</abbr> : null}</p>
          {choices.map((choice, index) => (
            <div className="checkbox" key={index}>
              <label htmlFor={choice.id}>
                <input
                  type="checkbox"
                  name={choice.id}
                  value={choice.value}
                  checked={values.indexOf(choice.value) !== -1}
                  onClick={(event) => this.updateField(event, field)}
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
