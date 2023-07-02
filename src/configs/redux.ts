import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from '@/reducers/counter';
import categoryReducer from '@/reducers/category';
import profileReducer from '@/reducers/profile';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const appReducer = combineReducers({
  counter: counterReducer,
  category: categoryReducer,
  profile: profileReducer
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
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
