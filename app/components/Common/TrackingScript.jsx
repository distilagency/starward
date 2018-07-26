import React from 'react';

export const TrackingScript = (props) => {
  const { type, id } = props;
  if (!id) return <span />;
  switch (type) {
    case 'ga':
      return (
        <div>
          <script dangerouslySetInnerHTML={{__html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', '${id}', 'auto');ga('send', 'pageview');`}} />
          <script async src="https://www.google-analytics.com/analytics.js" />
        </div>
      );
    case 'gtm':
      return <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}} />;
    default:
      return <span />;
  }
};
