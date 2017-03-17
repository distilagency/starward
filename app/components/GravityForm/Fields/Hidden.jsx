import React, { Component } from 'react';
import { textValdation } from '../Helpers/validation';

export default class Hidden extends Component {
  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submitSuccess !== nextProps.submitSuccess) {
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event, field) {
    const { id, required } = field;
    let dynamicValue = '';
    let value = '';
    if (field.prePopulated) {
      dynamicValue = this.context.location.query[field.prePopulatedParam];
      value = dynamicValue;
    } else {
      value = event.target ? event.target.value : '';
    }
    const valid = textValdation(required, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const { field, value } = this.props;
    const { id, type, required, maxLength } = field;
    return (
      <input
        name={id}
        type={type}
        value={!value ? '' : value}
        maxLength={maxLength}
        required={required}
        onChange={(event) => this.updateField(event, field)}
      />
    );
  }
}

Hidden.contextTypes = {
  location: React.PropTypes.object
};
