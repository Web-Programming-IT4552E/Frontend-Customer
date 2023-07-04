import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import categoryReducer from '@/reducers/category';
import counterReducer from '@/reducers/counter';
import profileReducer from '@/reducers/profile';
import orderReducer from '@/reducers/order'

const appReducer = combineReducers({
  counter: counterReducer,
  category: categoryReducer,
  profile: profileReducer,
  order: orderReducer
});

const rootReducer = (state: any, action: any) => {
  // if (action.type === "wallet/removeWallet") {
  // 	window.localStorage.removeItem("persist: root");
  // 	state = {};
  // }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

const persistor = persistStore(store);
export { persistor };

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
