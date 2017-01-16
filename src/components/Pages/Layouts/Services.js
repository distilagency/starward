import React, { PropTypes } from 'react';
import { Title } from '../../Common/Content/Title';
import { RenderContent } from '../../Common/Content/RenderContent';

export const Services = props => {
  const { title, content } = props;
  return(
    <section className="about_us">
      <Title title={title} h3 />
      <RenderContent content={content} />
    </section>
  );
};

Services.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
