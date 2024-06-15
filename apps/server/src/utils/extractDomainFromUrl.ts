import { __prod__ } from '../constants.js';

export function extractDomainFromUrl(url: string) {
  return url.replace(__prod__ ? 'https://' : 'http://', '').split(':')[0];
}
