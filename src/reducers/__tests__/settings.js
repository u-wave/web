import reducer, { load, apply } from '../settings';

describe('reducers/settings', () => {
  const initialState = () => reducer(undefined, { type: '@@redux/INIT' });
  it('should not respond to unrelated actions', () => {
    let state = { volume: 10 };
    state = reducer(state, { type: 'randomOtherAction', payload: {} });
    expect(state.volume).toBe(10);
  });

  it('should default to a settings object', () => {
    const state = reducer(undefined, { type: '@@redux/INIT' });
    expect(typeof state).toBe('object');
  });

  describe('action: settings/LOAD_SETTINGS', () => {
    it('should load all passed in settings', () => {
      const state = reducer(initialState(), load({
        setting: 'value',
        volume: 20,
      }));
      expect(state.setting).toBe('value');
      expect(state.volume).toBe(20);
    });
  });

  describe('action: settings/CHANGE_SETTING', () => {
    it('should set a value', () => {
      const state = reducer(initialState(), apply({ volume: 54 }));
      expect(state.volume).toBe(54);
    });
  });
});
