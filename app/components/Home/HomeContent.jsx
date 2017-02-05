import React, { PropTypes } from 'react';
import * as Layout from '../Acf/Layout/';
import { Head } from '../Common/Head';
import { Title } from '../Content/Title';
import { RenderContent } from '../Content/RenderContent';

export const HomeContent = props => {
  const getComponent = (item, index) => {
    const ComponentName = Layout[item.acf_fc_layout];
    return <ComponentName key={index} {...item} />;
  };
  const { acf, content, title, seo, siteName } = props;
  if (acf && acf.layout) {
    return (
      <main className="content" role="main">
        <Head {...seo} defaultTitle={`${title} - ${siteName}`} />
        <article>
          {acf.layout.map((item, index) => getComponent(item, index))}
        </article>
      </main>
    );
  }
  return (
    <main className="content" role="main">
      <Head {...seo} defaultTitle={`${title} - ${siteName}`} />
      <article>
        <Title title={title} tag="h1" />
        <RenderContent content={content} />
      </article>
    </main>
  );
};

HomeContent.propTypes = {
  layout: PropTypes.array,
  content: PropTypes.string,
  page_title: PropTypes.string,
};
