// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'lie/polyfill';
import 'whatwg-fetch';
import pFinally from 'p-finally';

if (!Promise.prototype.finally) {
  // eslint-disable-next-line no-extend-native
  Promise.prototype.finally = function finally_(handler) {
    return pFinally(this, handler);
  };
}
