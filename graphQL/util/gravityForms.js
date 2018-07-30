import hmacSha1 from 'crypto-js/hmac-sha1';
import encBase64 from 'crypto-js/enc-base64';
import { GRAVITY_PRIVATE, GRAVITY_PUBLIC } from '../../server/config/app';

const calculateSig = (stringToSign, privateKey) => {
  const hash = hmacSha1(stringToSign, privateKey);
  const base64 = hash.toString(encBase64);
  return encodeURIComponent(base64);
};

export const calcurateUnixExpiry = (currentTime, expiration = 3600) => {
  const unixTime = parseInt(currentTime.getTime() / 1000);
  return unixTime + expiration;
};

export const calculateSignature = (futureExpiry, method, route) => {
  const stringToSign = `${GRAVITY_PUBLIC}:${method}:${route}:${futureExpiry}`;
  const signature = calculateSig(stringToSign, GRAVITY_PRIVATE);
  return signature;
};
