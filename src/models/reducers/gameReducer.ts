import { createReducer } from "@reduxjs/toolkit";
import { setGameMode } from "../actions/gameActions";

const initialState = {
  gameMode: null,
};
const gameReducer = createReducer(initialState, (builder) => {
  builder.addCase(setGameMode, (state, action) => ({
    ...state,
    gameMode: action.payload,
  }));
});

export default gameReducer;
