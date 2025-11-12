import { createAction } from "@reduxjs/toolkit";

const setLoginUser = createAction<any>("user/setLoginUser");
const logoutUser = createAction("user/logoutUser");

export { setLoginUser, logoutUser };
