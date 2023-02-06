import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi, storage } from "../services/api"

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

const extraArgument = { authApi, storage };


export { rootReducer } from "./rootReducer";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};
