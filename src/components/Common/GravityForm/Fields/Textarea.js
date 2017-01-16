import React, { Component, PropTypes } from 'react';
import { textValdation } from '../Helpers/validation';

export default class Text extends Component {
  static propTypes = {
    field: PropTypes.object,
    value: PropTypes.string,
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
    const valid = textValdation(isRequired, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value, submitFailed, isValid } = this.props;
    const { id, type, label, placeholder, isRequired, maxLength } = field;
    return (
      <div className={!isValid && submitFailed ? 'field error' : 'field'}>
        <div className="textarea">
          <label>
            {label}{isRequired ? <abbr>*</abbr> : null}
            <textarea
              type={type}
              placeholder={placeholder}
              value={value ? value : ""}
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
