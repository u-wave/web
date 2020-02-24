import dlv from 'dlv';

/**
 * Turn an array into an object keyed by the value at the dotted `path` for each element.
 *
 * Nonexistent paths result in `undefined` being used as the key.
 * Duplicates are overwritten.
 *
 * @template Element
 * @param {Element[]} array
 * @param {string} path
 * @return {{ [key: string]: Element }}
 */
export default function indexByPath(array, path) {
  const object = Object.create(null);
  array.forEach((element) => {
    const key = dlv(element, path);
    object[key] = element;
  });
  return object;
}
