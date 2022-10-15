import yaml from 'js-yaml';

function process(src) {
  const json = yaml.load(src);
  return { code: `module.exports = ${JSON.stringify(json)};` };
}

export default { process };
