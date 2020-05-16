import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import reducersApp from "./index";

const rootReducer = (state, action) => {
  // console.log(state);
  // console.log(action);
  // storage.removeItem('persist:root')
  // state = undefined
  // if (action.type === 'SIGNIN_USER') {
  // }
  return reducersApp(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
  blacklist: ["navigation"], // navigation will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
