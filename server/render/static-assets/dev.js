import { trackingID } from '../../../app/config/app';
import favicon from '../../../app/images/favicon.png';

const createAppScript = () => '<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
`;

const createTrackingScript = () => (trackingID ? createAnalyticsSnippet(trackingID) : '');

const createStylesheets = () => `
<link rel="shortcut icon" href="${favicon}" />
`;

export { createAppScript, createTrackingScript, createStylesheets };
