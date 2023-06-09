import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userReducer from "./User/user.reducer";
//
import productReducer from "./Products/products.reducer";
import cartReducer from "./Cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productReducer,
    cartData: cartReducer
});

const configStorage = {
    key: 'root',
    storage,
    whiteList: ['cartData']
}

export default persistReducer(configStorage, rootReducer);