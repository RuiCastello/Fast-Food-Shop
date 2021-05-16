import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* burgerIngredientsInitSaga(action) {
    try{
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngredientsTHUNK(response.data));
    } catch(error) {
        yield put(actions.fetchIngredientsFailed());
    };
}