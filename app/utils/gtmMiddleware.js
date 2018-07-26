import { GTM_TRACK_PAGE_CHANGE } from '../actions/types';
import { isProduction } from '../config/app';

const logger = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

/**
 * fires a datalayer push to GTM to allow custom SPA based page navigations
 * inside of analytics
 */
const trackPageChange = () => {
  const { dataLayer } = window;
  if (!dataLayer) {
    logger('gtm couldn\'t track page change, cannot find gtm datalayer');
  } else {
    const event = {
      event: 'starward.pageview',
    };
    logger('pushing event to gtm datalayer: ', event);
    dataLayer.push(event);
  }
};

/**
 * middleware that lets us track certain events which add a gtm string
 * i.e. On page change, we should fire an event to GTM letting it know the page
 * has changed
 */
export const gtmMiddleware = store => next => (action) => {
  const { gtm } = action;

  // before running next, this will be the state BEFORE the action fired
  switch (gtm) {
    default:
      break;
  }

  // run the next call
  const result = next(action);

  // run after next
  switch (gtm) {
    case GTM_TRACK_PAGE_CHANGE: {
      trackPageChange();
      break;
    }
    default:
      break;
  }

  // return the result of firing the resolvers, this will be the state AFTER the action fired
  return result;
};
