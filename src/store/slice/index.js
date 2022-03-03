import { combineReducers } from 'redux';
import bills from './bills';
import carts from './carts';
import products from './products';
import provinces from './province';

const rootReducer = combineReducers({
    products: products,
    provinces: provinces,
    carts: carts,
    bills: bills
});

export default rootReducer;
