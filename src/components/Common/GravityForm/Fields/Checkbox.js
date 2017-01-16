import React, { Component, PropTypes } from 'react';
import { checkboxValidation } from '../Helpers/validation';

export default class Checkbox extends Component {
  static propTypes = {
    field: PropTypes.object,
    value: PropTypes.array,
    updateForm: PropTypes.func,
    submitSuccess: PropTypes.bool,
    submitFailed: PropTypes.bool,
    isValid: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = { values: []};
  }
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
    const default_values = choices.filter(choice => choice.isSelected);
    const valid = checkboxValidation(isRequired, default_values);
    this.setState({values: default_values});
    this.props.updateForm(default_values, id, valid);
  }
  updateField(event, field){
    const { id, choices, placeholder, isRequired } = field;
    const value = event.target.value;
    let selected_values = this.state.values;
    let valueIndex = selected_values.indexOf(value);
    if(valueIndex < 0){
      selected_values.push(event.target.value);
    } else{
      selected_values.splice(valueIndex, 1);
    }
    const valid = checkboxValidation(isRequired, selected_values);
    this.setState({values: selected_values});
    this.props.updateForm(selected_values, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { choices, id, label, placeholder, isRequired } = field;
    const values = value ? value.map(val => val.value) : [];
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="checkboxes">
          <p className="title">{label}{isRequired ? <abbr>*</abbr> : null}</p>
          {choices.map((choice, index) => (
            <div className="checkbox" key={index}>
              <label>
                <input
                  type="checkbox"
                  name={id}
                  value={choice.value}
                  checked={values.indexOf(choice.value) != -1}
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
