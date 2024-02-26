import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loggedIn: false
    },
    reducers: {
      setUser(state, action) {
        state.user = action.payload;
        state.loggedIn = true;
      },
      removeUser(state) {
        state.user = {};
        state.loggedIn = false;
      }
    }
});
  
export const userActions = userSlice.actions;

export default userSlice;