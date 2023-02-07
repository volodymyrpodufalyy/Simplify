import { combineReducers } from "@reduxjs/toolkit"
import { reducer as AuthReducer } from "./auth/reducer"
import { eventsSlice } from "./events/reducer"

/**
 * Reducers (slices go here)
 */
export const rootReducer = combineReducers({
  AuthReducer,
  EventsReducer: eventsSlice.reducer,
})
