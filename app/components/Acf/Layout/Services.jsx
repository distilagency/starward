import React from 'react';
import { Title } from '../../Content/Title';
import { RenderContent } from '../../Content/RenderContent';

export const Services = (props) => {
  const { title, content } = props;
  return (
    <section className="about_us">
      <Title title={title} h3 />
      <RenderContent content={content} />
    </section>
  );
};
