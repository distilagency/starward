import React, { Component } from 'react';
import { checkboxValidation } from '../Helpers/validation';

// Check whether selected option is defaultChecked (has additional .value key)
// or selected by user
const getSelectedValue = (option) => {
  if (option.value && option.value.value) {
    return option.value.value;
  }
  return option.value;
};

const joinString = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase();
};

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
    const defaultChecked = choices.filter(choice => choice.isSelected);
    const defaultValues = defaultChecked ? defaultChecked.map(option => option.value) : [];
    const valid = checkboxValidation(required, defaultValues);
    this.setState({ values: defaultValues });
    this.props.updateForm(defaultValues, id, valid);
  }
  updateField(event, value, field) {
    event.preventDefault();
    const { id, required } = field;
    const selectedValues = this.state.values;
    const valueIndex = selectedValues.indexOf(value);
    if (valueIndex < 0) {
      selectedValues.push(value);
    } else {
      selectedValues.splice(valueIndex, 1);
    }
    const valid = checkboxValidation(required, selectedValues);
    this.setState({ values: selectedValues });
    this.props.updateForm(selectedValues, id, valid);
  }
  render() {
    const {
      field,
      value,
      submitFailed,
      isValid
    } = this.props;
    const {
      choices,
      label,
      classes,
      required
    } = field;
    const values = value ? value.map(getSelectedValue) : [];
    return (
      <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
        <div className="checkboxes">
          <p className="title">{label}{required ? <abbr>*</abbr> : null}</p>
          {choices.map(choice => (
            <div className="checkbox" key={choice.value}>
              <label htmlFor={joinString(choice.value)} onClick={event => this.updateField(event, choice.value, field)}>
                <input
                  type="checkbox"
                  name={joinString(choice.value)}
                  value={choice.value}
                  checked={values.indexOf(choice.value) !== -1}
                  onChange={() => {}}
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
