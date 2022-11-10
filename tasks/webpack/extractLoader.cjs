'use strict';

module.exports = function extractLoader() {};
module.exports.pitch = async function extractLoaderPitch(entrypoint) {
  const result = await this.importModule(
    [this.resourcePath, '.webpack[javascript/auto]', '!=!', entrypoint].join(''),
  );

  return result.default;
};
