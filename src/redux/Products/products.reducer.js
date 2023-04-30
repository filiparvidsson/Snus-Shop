import productTypes from "./products.types";

const INITITAL_STATE = {
    product: [],
    snus: {}
};

const productReducer = (state=INITITAL_STATE, action) => {
    switch(action.type) {
        case productTypes.SET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }
        case productTypes.SET_PRODUCT:
            return {
                ...state,
                snus: action.payload
            }
        default:
            return state;
    }
};

export default productReducer;