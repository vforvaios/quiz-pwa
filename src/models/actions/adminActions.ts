import { createAction } from "@reduxjs/toolkit";

const setCategories = createAction<any>("admin/setCategories");
const setDifficulties = createAction<any>("admin/setDifficulties");

export { setCategories, setDifficulties };
