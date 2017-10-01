/**
 * A JSON loader that outputs ES modules.
 */

module.exports = function jsonLoader(source) {
  this.cacheable();

  const object = JSON.parse(source);
  const output = [];

  Object.entries(object).forEach(([ key, value ]) => {
    output.push(`export const ${key} = ${JSON.stringify(value, null, 2)};`);
  });

  return output.join('\n\n');
};
