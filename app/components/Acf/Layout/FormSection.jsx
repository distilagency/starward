import React from 'react';
import GravityForm from '../../GravityForm/Form';

export const FormSection = props => {
  const { form_id, show_title, show_description } = props;
  return(
    <GravityForm
      formId={form_id}
      showTitle={show_title}
      showDescription={show_description}
    />
  );
};
