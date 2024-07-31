import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";

const combinedReducer = combineReducers({
  user,
});

export default combinedReducer;
