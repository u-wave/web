// Polyfills for browsers all the way down to IE11.
import 'array.from/auto';
import 'array.prototype.find/auto';
import 'array.prototype.findindex/auto';
import 'array-includes/auto';
import 'object.assign/auto';
import 'object-is/auto';
import 'object.values/auto';
import 'is-nan/auto';
import 'string.prototype.includes/auto';
import 'es6-promise/auto';
import 'es6-symbol/implement';
import 'css.escape';
import 'url-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/src/polyfill';
import numberIsFinite from 'is-finite';

if (!Number.isFinite) {
  // eslint-disable-next-line no-extend-native
  Number.isFinite = numberIsFinite;
}
