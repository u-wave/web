// Polyfills for browsers that might not yet support Promises or the Fetch API
// (newer & better XMLHttpRequest).
import 'lie/polyfill';
import 'whatwg-fetch';
import pFinally from 'p-finally';
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
  Array.prototype.find = function find(predicate, ctx = undefined) {
    const l = this.length;
    for (let i = 0; i < l; i += 1) {
      const v = this[i];
      if (predicate.call(ctx, v, i, this)) {
        return v;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.findIndex) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.findIndex = function findIndex(predicate, ctx = undefined) {
    const l = this.length;
    for (let i = 0; i < l; i += 1) {
      if (predicate.call(ctx, this[i], i, this)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.includes = function includes(value) {
    for (let i = 0; i < this.length; i += 1) {
      if (Object.is(this[i], value)) {
        return true;
      }
    }
    return false;
  };
}

if (!String.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  String.prototype.includes = function includes(substring) {
    return this.indexOf(substring) !== -1;
  };
}

if (!Object.is) {
  // eslint-disable-next-line no-extend-native
  Object.is = function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y; // eslint-disable-line no-self-compare
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
