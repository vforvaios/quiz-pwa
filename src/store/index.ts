import loginReducer from "@/models/reducers/loginReducer";
import categoriesReducer from "@/models/reducers/categoriesReducer";
import gameReducer from "@/models/reducers/gameReducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loaderReducer from "@/models/reducers/loaderReducer";
import adminReducer from "@/models/reducers/adminReducer";

const persistConfig = {
  key: "state",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    adminReducer,
    loginReducer,
    categoriesReducer,
    loaderReducer,
    gameReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
