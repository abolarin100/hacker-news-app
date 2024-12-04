import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HACKER_NEWS_BASE_URL } from '@env';


export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async (page, { getState }) => {
    const response = await axios.get(`${HACKER_NEWS_BASE_URL}/topstories.json`);
    const storyIds = response.data.slice((page - 1) * 20, page * 20);
    const storyData = await Promise.all(
      storyIds.map(id => axios.get(`${HACKER_NEWS_BASE_URL}/item/${id}.json`))
    );
    return storyData.map(res => res.data);
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    stories: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = [...state.stories, ...action.payload];
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { incrementPage } = storiesSlice.actions;
export default storiesSlice.reducer;
