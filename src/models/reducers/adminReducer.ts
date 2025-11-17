import { createReducer } from "@reduxjs/toolkit";
import { setCategories, setDifficulties } from "../actions/adminActions";

const initialState = {
  categories: [],
  difficulties: [],
};
const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCategories, (state, action) => ({
      ...state,
      categories: action.payload,
    }))
    .addCase(setDifficulties, (state, action) => ({
      ...state,
      difficulties: action.payload,
    }));
});

export default adminReducer;
