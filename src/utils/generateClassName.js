export default function generateClassName(rule, styleSheet) {
  const componentName = styleSheet.options.name;
  if (rule.key === 'root') {
    return componentName;
  }
  return `${componentName}-${rule.key}`;
}

