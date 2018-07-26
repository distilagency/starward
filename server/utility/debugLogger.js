import { isDevelopment } from './environment';

export const debugLogger = (timestamp, prefix = '', suffix = '') => {
  return (message = '') => {
    if (isDevelopment) {
      let timestampPrefix = '';
      if (timestamp === 'ms') {
        const d = new Date();
        timestampPrefix = `${d.getTime()} `;
      }
      console.log(timestampPrefix + prefix + message + suffix);
    }
  };
};
