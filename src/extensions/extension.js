class Extension {
  constructor(name) {
    this.name = name;
    this.id = Symbol(`extension: ${name}`);
  }
}

const extensions = {};

export default function extension(name, definition) {
  if (typeof name !== 'string') {
    throw new TypeError(
      `uw.extension(): You have to give your extension a name. Expected a string ` +
      `as the first parameter, got "${typeof name}".`
    );
  }
  extensions[name] = definition(new Extension(name));
}
