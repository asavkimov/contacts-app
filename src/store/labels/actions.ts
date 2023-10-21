import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import api from 'api';

export const fetchLabels = createAsyncThunk('labels/fetchLabels', async (_, ThunkApi) => {
  const { labels } = (ThunkApi.getState() as RootState).labels;

  if (labels.length) {
    return labels;
  }

  return await api.labels.getLabels();
});
