import { takeLatest, put, all, call} from 'redux-saga/effects';
import { setProducts, setProduct, fetchProductsStart } from './products.actions';
import productTypes from './products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct, handleFetchProduct, handleOrderProducts } from './products.helper';
import { auth } from '../../firebase/utils';

export function* addProduct({payload}) {

    try {

        const timeStamp = new Date();

        yield handleAddProduct({

            ...payload,

            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp

        });
        yield put (
            fetchProductsStart()
        );

    }catch(err){
        //console.log(err);
    }

}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts( { payload
     } ) {
    try {
        const products = yield handleFetchProducts( payload );
        yield put(
            setProducts(products)
        )

    } catch(err){
        //console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }){
    try {
        yield handleDeleteProduct(payload);
        yield put (
            fetchProductsStart()
        );
    }catch(err){
        //console.log(err)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct ({ payload }) {
    try {
        const snus = yield handleFetchProduct(payload);
        yield put(
            setProduct(snus)
        );

    }catch(err){
        //console.log(err);
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* orderProducts({ payload }) {

    try {

        const timeStamp = new Date();

        yield handleOrderProducts({

            ...payload,
            createdDate: timeStamp

        });

    }catch(err){
        //console.log(err);
    }

}

export function* onOrderProductsStart() {
    yield takeLatest(productTypes.ORDER_PRODUCTS, orderProducts);
}

export default function* productSagas () {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
        call(onOrderProductsStart)
    ])
}