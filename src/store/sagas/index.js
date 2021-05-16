import { takeEvery, all, takeLatest} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { burgerIngredientsInitSaga } from './burgerBuilder';
import { purchaseBurgerSaga, orderFetchOrder} from './order';


export function* watchAuth() {

    // WITH "ALL" SAGA HELPER
    // RUNS ALL "takeEvery" simultaneously in multithread
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
   
    // WITHOUT "ALL"
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.BURGER_INGREDIENTS_INIT, burgerIngredientsInitSaga);
}

export function* watchOrders() {

    // takeLatest is almost the same as takeEvery, except it will cancel any old dispatches and only use the latest one.
    // It's good to prevent spam attacks, brute-force, or just poor user input, etc.
    yield takeLatest(actionTypes.ORDER_PURCHASE_BURGER, purchaseBurgerSaga);
    
    yield takeEvery(actionTypes.ORDER_FETCH_ORDER, orderFetchOrder);
}