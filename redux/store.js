import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './slices/storiesSlice';
import userReducer from './slices/userSlice';


const store = configureStore({
  reducer: {
    stories: storiesReducer, 
    user: userReducer,

  },
});

export default store;
