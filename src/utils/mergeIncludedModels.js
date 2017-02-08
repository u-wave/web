import getPath from 'lodash/get';
import setPath from 'lodash/set';
import find from 'lodash/find';

export default function mergeIncludedModels({ data, meta, included }) {
  Object.keys(meta.included || {}).forEach((type) => {
    meta.included[type].forEach((path) => {
      data.forEach((item) => {
        const id = getPath(item, path);
        const model = find(included[type], m => m._id === id);
        setPath(item, path, model);
      });
    });
  });
  return data;
}
