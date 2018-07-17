export default function readApplicationConfig(container = '#u-wave-config') {
  try {
    return JSON.parse(document.querySelector(container).textContent);
  } catch (e) {
    return {};
  }
}
