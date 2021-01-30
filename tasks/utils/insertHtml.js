'use strict';

/**
 * Webpack loader that inserts HTML instead of just exporting it.
 */

module.exports = (source) => source;
module.exports.pitch = function insertHtml(remainingRequest) {
  const loader = this;
  loader.cacheable();

  const requirePath = JSON.stringify(`!!${remainingRequest}`);

  return `
    function unwrapDefault(m) {
      if (m && m.__esModule) {
        return m.default;
      }
      return m;
    }

    function insert(contents) {
      document.getElementById('app').innerHTML = contents;
      try { window.title = document.querySelector('#app > h1').textContent }
      catch (e) {}
    }

    insert(unwrapDefault(require(${requirePath})));

    if (module.hot) {
      module.hot.accept(${requirePath}, function () {
        insert(unwrapDefault(require(${requirePath})));
      });
      module.hot.dispose(function () {
        insert('');
      });
    }
  `;
};
