// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'lie/polyfill';
import 'whatwg-fetch';
import pFinally from 'p-finally';
import arrayFind from 'array-find';
import arrayFindIndex from 'array-findindex';
import objectAssign from 'object-assign';
import objectValues from 'object-values';

if (!Promise.prototype.finally) {
  // eslint-disable-next-line no-extend-native
  Promise.prototype.finally = function finally_(handler) {
    return pFinally(this, handler);
  };
}

if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.find = function find_(predicate) {
    return arrayFind(this, predicate);
  };
}

if (!Array.prototype.findIndex) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.findIndex = function findIndex_(predicate) {
    return arrayFindIndex(this, predicate);
  };
}

if (!Object.assign) {
  // eslint-disable-next-line no-extend-native
  Object.assign = objectAssign;
}

if (!Object.values) {
  // eslint-disable-next-line no-extend-native
  Object.values = objectValues;
}
