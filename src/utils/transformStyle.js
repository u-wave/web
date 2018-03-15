/**
 * Create a vendor-prefixed inline CSS object for a "transform" property.
 *
 * @param {string} transform CSS transform value.
 * @return {Object}
 */

export default function transformStyle(transform) {
  return {
    transform,
    WebkitTransform: transform,
  };
}
