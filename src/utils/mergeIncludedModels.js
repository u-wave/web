import dlv from 'dlv';
import { dset } from 'dset';

/**
 * @param {{ data: any[], meta: object, included: object }} response
 */
function mergeIncludedModels({ data: input, meta, included }) {
  const data = structuredClone(input);
  Object.keys(meta.included ?? {}).forEach((type) => {
    meta.included[type].forEach((path) => {
      data.forEach((item) => {
        const id = dlv(item, path);
        const model = included[type].find((m) => m._id === id);
        dset(item, path, model);
      });
    });
  });
  return data;
}

export default mergeIncludedModels;
