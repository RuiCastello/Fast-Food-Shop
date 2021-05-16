import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}


const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) =>{
    const priceAddition = Object.entries(action.ingredients).reduce( (acc, element) => {
        const [ingredientName, ingredientQuantity] = element;
        return ( acc + ( INGREDIENT_PRICES[ingredientName] * ingredientQuantity ) );
    }, 0 )

    const oldPrice = initialState.totalPrice;
    const newPrice = oldPrice + priceAddition;

    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: newPrice,
        error: false,
        building: false,
    };
};

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) =>{

    switch (action.type){
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);            
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        default: return state;
    }
} 

export default reducer;