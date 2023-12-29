import { type UnknownAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'errors',
  initialState: [] as string[],
  reducers: {
    dismissError: (state) => {
      return state.slice(1);
    },
  },
  selectors: {
    firstError: (state) => state[0],
  },
  extraReducers(builder) {
    builder.addMatcher(
      (action: UnknownAction) => 'error' in action && Boolean(action.error),
      (state, action: { type: string, payload?: Error, error?: Error }) => {
        const { payload, error } = action;
        const message = (typeof error === 'object' ? error?.message : null) ?? payload?.message ?? 'Unknown error';
        // Avoid adding the same error over and over
        if (state.length === 0 || state[state.length - 1] !== message) {
          state.push(message);
        }
      },
    );
  },
});

export default slice.reducer;

export const { dismissError } = slice.actions;
export const { firstError: firstErrorSelector } = slice.selectors;
