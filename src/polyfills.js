// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'lie/polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/src/polyfill';
import promiseFinally from 'promise.prototype.finally';
import arrayFind from 'array.prototype.find';
import arrayFindIndex from 'array.prototype.findindex';
import arrayIncludes from 'array-includes';
import objectAssign from 'object.assign';
import objectIs from 'object-is';
import objectValues from 'object.values';
import numberIsNaN from 'is-nan';
import numberIsFinite from 'is-finite';

promiseFinally.shim();
arrayFind.shim();
arrayFindIndex.shim();
arrayIncludes.shim();
objectAssign.shim();
objectIs.shim();
objectValues.shim();
numberIsNaN.shim();

if (!String.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  String.prototype.includes = function includes(substring) {
    return this.indexOf(substring) !== -1;
  };
}

if (!Number.isFinite) {
  // eslint-disable-next-line no-extend-native
  Number.isFinite = numberIsFinite;
}
