import { combineReducers } from "redux";
import { HomeReducer } from "./productsHomePage/reducers";
import { AllProductsReducer } from "./productsByCategory/reducers";
import { CartReducer } from "./cart/reducers";
import { UserReducer } from "./user/reducers";
import { ProductDetailReducer } from "./productDetail/reducers";

const rootReducer = combineReducers({
  HomeReducer,
  AllProductsReducer,
  CartReducer,
  UserReducer,
  ProductDetailReducer,
});

export default rootReducer;
