import { combineReducers } from "redux";
import userReducer from "../pages/signin/reducers";
import transactionReducer from "../pages/transaction/reducers";
import productReducer from "../pages/product/reducers";

const reducersApp = combineReducers({
  userReducer,
  transactionReducer,
  productReducer,
});

export default reducersApp;
