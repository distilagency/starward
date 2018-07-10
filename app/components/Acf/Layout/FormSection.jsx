import React from 'react';
import GravityForm from '../../GravityForm/Form';

export const FormSection = props => {
  const {
    formId,
    showTitle,
    showDescription,
    location
  } = props;
  return (
    <GravityForm
      formId={formId}
      showTitle={showTitle}
      showDescription={showDescription}
      location={location}
    />
  );
};
