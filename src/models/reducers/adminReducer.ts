import { createReducer } from "@reduxjs/toolkit";
import { setCategories } from "../actions/adminActions";

const initialState = {
  categories: [],
};
const adminReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCategories, (state, action) => ({
    ...state,
    categories: action.payload,
  }));
});

export default adminReducer;
