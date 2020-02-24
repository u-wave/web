import getPath from 'dlv';
import setPath from 'dset';

export default function mergeIncludedModels({ data, meta, included }) {
  Object.keys(meta.included || {}).forEach((type) => {
    meta.included[type].forEach((path) => {
      data.forEach((item) => {
        const id = getPath(item, path);
        const model = included[type].find((m) => m._id === id);
        setPath(item, path, model);
      });
    });
  });
  return data;
}
