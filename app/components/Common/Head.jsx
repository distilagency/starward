import React, { ContextTypes } from 'react';
import Helmet from 'react-helmet';

export const Head = (props, context) => {
  const {
    title,
    defaultTitle,
    metadesc,
    canonical
  } = props;
  const nofollow = props['meta-robots-nofollow'];
  const noindex = props['meta-robots-noindex'];
  const ogDescription = props['opengraph-description'];
  const ogImage = props['opengraph-image'];
  const ogTitle = props['opengraph-title'];

  const meta = [
    {name: 'description', content: metadesc },
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: ogTitle ? ogTitle : title},
    {property: 'og:description', content: ogDescription ? ogDescription : metadesc},
    {property: 'og:image', content: ogImage},
    {property: 'robots', content: noindex},
    {property: 'robots', content: nofollow}
  ];

  const links = [
    {rel: 'canonical', href: canonical },
    {rel: 'shortcut icon', href: '/assets/images/favicon.ico' }
  ];

  return (
    <Helmet
      htmlAttributes={{lang: 'en', amp: undefined}}
      title={title}
      defaultTitle={defaultTitle}
      titleAttributes={{itemprop: 'name', lang: 'en'}}
      meta={meta.map(data => {
        if (data.content) return data;
        return {};
      })}
      link={links.map(link => {
        if (link.href) return link;
        return {};
      })}
      onChangeClientState={(newState) => console.log('newState', newState)}
    />
  );
};

Head.contextTypes = {
  location: React.PropTypes.object
};
