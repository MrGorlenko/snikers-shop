import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import basketReducer from "../features";
import orderReducer from "../features/order";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import { persistCombineReducers } from "reduxjs-toolkit-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const _persistedReducer = persistCombineReducers(persistConfig, {
  basket: basketReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
