import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/**
 * Place to add enhancers 
 */
const enhancers = [];

// toolkit includes redux-thunk by default, and enables use of the Redux DevTools Extension.
const store = configureStore({
  reducer: rootReducer,
  enhancers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export { rootReducer } from "./reducers";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;