import { createAction } from "@reduxjs/toolkit";

const setCategory = createAction<any>("categories/setCategory");
const setDifficulty = createAction<any>("categories/setDifficulty");

export { setCategory, setDifficulty };
