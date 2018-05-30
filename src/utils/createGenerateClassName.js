export default function createGenerateClassName() {
  let counter = 0;

  function getNextUnknownName() {
    counter += 1;
    return `Component${counter}`;
  }

  function generateClassName(rule, styleSheet) {
    const componentName = styleSheet.options.name || getNextUnknownName();
    if (rule.key === 'root') {
      return componentName;
    }
    return `${componentName}-${rule.key}`;
  }

  return generateClassName;
}
