// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    registrationStatus: null, 
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setRegistrationStatus(state, action) {
      state.registrationStatus = action.payload;
    },
  },
});

export const { setEmail, setPassword, setRegistrationStatus } = userSlice.actions;
export default userSlice.reducer;
