import { createReducer } from "@reduxjs/toolkit";
import { setCategory, setDifficulty } from "../actions/categoriesActions";

const initialState = {
  category: null,
  difficulty: null,
};
const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCategory, (state, action) => ({
      ...state,
      category: action.payload,
    }))
    .addCase(setDifficulty, (state, action) => ({
      ...state,
      difficulty: action.payload,
    }));
});

export default categoriesReducer;
