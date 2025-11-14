import { createReducer } from "@reduxjs/toolkit";
import { logoutUser, setLoginUser } from "../actions/loginActions";

const initialState = {
  user: null,
};
const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoginUser, (state, action) => ({
      ...state,
      user: action.payload,
    }))
    .addCase(logoutUser, (state) => ({
      ...state,
      user: null,
    }));
});

export default loginReducer;
