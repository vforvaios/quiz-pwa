import { createReducer } from "@reduxjs/toolkit";
import { setCategories, setCategory } from "../actions/categoriesActions";

const initialState = {
  categories: [],
  category: null,
};
const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCategories, (state, action) => ({
      ...state,
      categories: action.payload,
    }))
    .addCase(setCategory, (state, action) => ({
      ...state,
      category: action.payload,
    }));
});

export default categoriesReducer;
