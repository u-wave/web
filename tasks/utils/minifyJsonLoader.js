// Remove whitespace etc. from a JSON string.
function minifyJsonLoader(contents) {
  return JSON.stringify(JSON.parse(contents));
}

minifyJsonLoader.raw = true;

module.exports = minifyJsonLoader;
