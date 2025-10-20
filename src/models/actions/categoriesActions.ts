import { createAction } from "@reduxjs/toolkit";

const setCategories = createAction<any>("categories/setCategories");
const setCategory = createAction<any>("categories/setCategory");

export { setCategories, setCategory };
