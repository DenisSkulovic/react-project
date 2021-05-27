import { combineReducers } from "redux";
import { HomeReducer } from "./productsHomePage/reducers";
import { AllProductsReducer } from "./productsByCategory/reducers";
import { CartReducer } from "./cart/reducers";
import { UserReducer } from "./user/reducers";
import { ProductDetailReducer } from "./productDetail/reducers";
import { HistoryReducer } from "./history/reducers";
import { PaymentReducer } from "./payment/reducers";

const rootReducer = combineReducers({
  HomeReducer,
  AllProductsReducer,
  CartReducer,
  UserReducer,
  ProductDetailReducer,
  HistoryReducer,
  PaymentReducer,
});

export default rootReducer;
