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
// import 'es6-symbol/implement';
import 'url-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/src/polyfill';
import numberIsFinite from 'is-finite';

// Very bad symbol polyfill until webpack is fixed and es6-symbol can be used.
if (!window.Symbol) {
  let si = 0;
  const symbols = new Map();
  window.Symbol = function Symbol(description) {
    return Object.assign(new String(`$$symbol-${si++}`), { description });
  };
  Symbol.for = function SymbolFor(key) {
    if (!symbols.has(key)) {
      symbols.set(key, Symbol(key));
    }
    return symbols.get(key);
  };
}

if (!Number.isFinite) {
  // eslint-disable-next-line no-extend-native
  Number.isFinite = numberIsFinite;
}
