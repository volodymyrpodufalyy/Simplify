import { combineReducers } from "@reduxjs/toolkit";
import {reducer as AuthReducer} from "./auth/reducer"

/**
 * Reducers (slices go here)
 */
export const rootReducer = combineReducers({
  AuthReducer
});
