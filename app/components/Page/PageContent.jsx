import React from 'react';
import * as Layout from '../Acf/Layout/';
import { Head } from '../Common/Head';
import { FourOhFour } from '../Content/FourOhFour';
import { Title } from '../Content/Title';
import { RenderContent } from '../Content/RenderContent';
import ErrorBoundary from '../Common/ErrorBoundary';

const AcfComponent = ({ item, location }) => {
  const ComponentName = Layout[item.acf_fc_layout];
  return (
    <ErrorBoundary>
      <ComponentName
        location={location}
        {...item}
      />
    </ErrorBoundary>
  );
};

export const PageContent = (props) => {
  const {
    acf,
    content,
    title,
    seo,
    siteName,
    location
  } = props;
  if ((!acf || !acf.layout) && !content) return <FourOhFour />;
  if (acf && acf.layout) {
    return (
      <main className="content" role="main">
        <Head {...seo} defaultTitle={`${title} - ${siteName}`} />
        <article>
          {acf.layout.map((item, index) => (
            <AcfComponent
              key={index}
              item={item}
              location={location}
            />
          ))}
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
