import ejs from 'ejs';

export default function ejsLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const template = ejs.compile(source, {
    async: true,
    client: true,
  });
  return `module.exports = ${template.toString()};`;
}
