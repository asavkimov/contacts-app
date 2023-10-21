import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabelsState } from './types';
import { GetLabelsResponse } from 'api/labels/types';
import { fetchLabels } from './actions';

const initialState: LabelsState = {
  labels: [],
};

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLabels.fulfilled, (state, action: PayloadAction<GetLabelsResponse>) => {
      state.labels = action.payload;
    });
  },
});

export const labelsReducer = labelsSlice.reducer;
