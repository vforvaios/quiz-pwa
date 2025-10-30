import { createAction } from "@reduxjs/toolkit";

const setLoading = createAction<any>("loader/setLoading");

export { setLoading };
