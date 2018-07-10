import { trackingID } from '../../../app/config/app';
import favicon from '../../../app/images/favicon.png';

const createAppScript = () => '<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';

const createTrackingScript = () => trackingID ? createAnalyticsSnippet(trackingID) : '';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
`;

const createStylesheets = () => `
<link rel="shortcut icon" href="${favicon}" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed" />
`;

export { createAppScript, createTrackingScript, createStylesheets };
