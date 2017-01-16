import React, { PropTypes } from 'react';
import * as FormFields from './Fields';

const formatComponentName = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const RenderFields = props => {
  const { fields, form_values, updateForm, submitFailed, submitSuccess } = props;
  return(
    <div className="fields">
      {fields.map(field => {
        const FormComponent = FormFields[formatComponentName(field.type)];
        const isValid = form_values[field.id] ? form_values[field.id].valid : false;
        return (
          <FormComponent
            key={field.id}
            field={field}
            value={form_values[field.id] ? form_values[field.id].value : null}
            updateForm={(value, field, valid) => updateForm(value, field, valid)}
            isValid={isValid}
            submitFailed={submitFailed}
            submitSuccess={submitSuccess}
          />
        );
      })}
    </div>
  );
}

RenderFields.propTypes = {
  fields: PropTypes.array,
  form_values: PropTypes.array,
  updateForm: PropTypes.func,
  submitFailed: PropTypes.bool,
  submitSuccess: PropTypes.bool,
}
