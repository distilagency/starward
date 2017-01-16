import React, { PropTypes } from 'react';
import GravityFrom from '../../Common/GravityFrom';

export const FormSection = props => {
  const { form_id, show_title, show_description } = props;
  return(
    <GravityFrom
      form_id={form_id}
      showTitle={show_title}
      showDescription={show_description}
    />
  );
};

FormSection.propTypes = {
  form_id: PropTypes.string,
  show_title: PropTypes.bool,
  show_description: PropTypes.bool,
};
