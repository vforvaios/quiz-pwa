import { createReducer } from "@reduxjs/toolkit";
import { setLoading } from "../actions/loaderAction";

const initialState = {
  isLoading: false,
};
const loaderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoading, (state, action) => ({
    ...state,
    isLoading: action.payload,
  }));
});

export default loaderReducer;
