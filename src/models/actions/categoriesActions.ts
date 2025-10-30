import { createAction } from "@reduxjs/toolkit";

const setCategories = createAction<any>("categories/setCategories");
const setCategory = createAction<any>("categories/setCategory");
const setDifficulty = createAction<any>("categories/setDifficulty");

export { setCategories, setCategory, setDifficulty };
