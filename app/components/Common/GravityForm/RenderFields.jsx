import React from 'react';
import * as FormFields from './Fields';

const formatComponentName = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const RenderFields = props => {
  const { fields, formValues, updateForm, submitFailed, submitSuccess } = props;
  return (
    <div className="fields">
      {fields.map(field => {
        const FormComponent = FormFields[formatComponentName(field.type)];
        const isValid = formValues[field.id] ? formValues[field.id].valid : false;
        return (
          <FormComponent
            key={field.id}
            field={field}
            value={formValues[field.id] ? formValues[field.id].value : null}
            updateForm={(value, field, valid) => updateForm(value, field, valid)}
            isValid={isValid}
            submitFailed={submitFailed}
            submitSuccess={submitSuccess}
          />
        );
      })}
    </div>
  );
};
