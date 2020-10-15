import expect from 'expect';
import mergeIncludedModels from '../mergeIncludedModels';

describe('utils/mergeIncludedModels()', () => {
  it('merges included models as described by meta.included', () => {
    const response = {
      meta: {
        included: { user: ['user'] },
      },
      data: [
        { user: 1 },
        { user: 2 },
      ],
      included: {
        user: [
          { _id: 1, name: 'one' },
          { _id: 2, name: 'two' },
        ],
      },
    };

    const merged = mergeIncludedModels(response);

    expect(merged).toEqual([
      { user: { _id: 1, name: 'one' } },
      { user: { _id: 2, name: 'two' } },
    ]);
  });

  it('can contain multiple references to the same included model', () => {
    const response = {
      meta: {
        included: { user: ['user'] },
      },
      data: [
        { user: 1 },
        { user: 2 },
        { user: 1 },
      ],
      included: {
        user: [
          { _id: 1, name: 'one' },
          { _id: 2, name: 'two' },
        ],
      },
    };

    expect(mergeIncludedModels(response)).toEqual([
      { user: { _id: 1, name: 'one' } },
      { user: { _id: 2, name: 'two' } },
      { user: { _id: 1, name: 'one' } },
    ]);
    const merged = mergeIncludedModels(response);
    expect(merged[0].user).toBe(merged[2].user);
  });

  it('can reference included models on subkeys', () => {
    const response = {
      meta: {
        included: { user: ['abc.def.ghi'] },
      },
      data: [
        { abc: { def: { ghi: 2 } } },
        { abc: { def: { ghi: 1 } } },
      ],
      included: {
        user: [
          { _id: 1, name: 'hello' },
          { _id: 2, name: 'goodbye' },
        ],
      },
    };

    expect(mergeIncludedModels(response)).toEqual([
      { abc: { def: { ghi: { _id: 2, name: 'goodbye' } } } },
      { abc: { def: { ghi: { _id: 1, name: 'hello' } } } },
    ]);
  });
});
