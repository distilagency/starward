import React, { PropTypes } from 'react';
import * as Layouts from './Layouts/';
import { FourOhFour } from '../Common/Content/FourOhFour';
import { Title } from '../Common/Content/Title';
import { RenderContent } from '../Common/Content/RenderContent';

export const PageContent = props => {
  const getComponent = (item) => {
    const ComponentName = Layouts[item.acf_fc_layout];
    return <ComponentName key={item.acf_fc_layout} {...item} />;
  };
  const { layout, content, page_title } = props;
  console.log("layout", layout);
  if(!layout && !content){
    return <FourOhFour />;
  }
  if(layout){
    return (
      <main id="content">
        <article>
          {layout.map(item => getComponent(item))}
        </article>
      </main>
    );
  }
  return(
    <main id="content" role="main">
      <article>
        <Title title={page_title} tag="h1" />
        <RenderContent content={content} />
      </article>
    </main>
  );
};

PageContent.propTypes = {
  layout: PropTypes.array,
  content: PropTypes.string,
  page_title: PropTypes.string,
};
