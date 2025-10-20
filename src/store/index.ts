import loginReducer from "@/models/reducers/loginReducer";
import categoriesReducer from "@/models/reducers/categoriesReducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "state",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    loginReducer,
    categoriesReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
