import { createSlice } from '@reduxjs/toolkit';
import api from '../app/api';

export const initialState = {
  loading: false,
  hasErrors: false,
  sandboxes: [],
};

export const sandboxesSlice = createSlice({
  name: 'sandboxes',
  initialState,
  reducers: {
    getSandboxes: (state) => {
      state.loading = true;
    },
    getSandboxesSuccess: (state, { payload }) => {
      state.sandboxes = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getSandboxesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getSandboxes,
  getSandboxesSuccess,
  getSandboxesFailure,
} = sandboxesSlice.actions;

export const selectSandboxes = (state) => state.sandboxesReducer;

export default sandboxesSlice.reducer;

// Asynchronous thunk action
export function getAllSandboxes() {
  return async (dispatch) => {
    dispatch(getSandboxes());

    try {
      const response = await api.get('sandbox/');

      dispatch(getSandboxesSuccess(response.data));
    } catch (error) {
      dispatch(getSandboxesFailure());
    }
  };
}
