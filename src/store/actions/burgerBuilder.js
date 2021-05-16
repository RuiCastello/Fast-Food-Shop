import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

// Este setIngredients recebe os ingredients que já foram fetched com uma função async dentro do próprio componente, por isso não necessita de redux THUNK. Mais abaixo mostro uma alternativa que usa async calls dentro do redux, mais precisamente aqui nos action creators.
export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const addIngredient = (ingredientName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};


//
// USANDO REDUX THUNK PARA EXECUTAR CODIGO ASYNC COM O REDUX
//
export const setIngredientsTHUNK = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = ()  =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
  
    // WITHOUT SAGAS
    //Este return com uma função que recebe dispatch só é possível de usar com o REDUX THUNK
    // return (dispatch) => {

    //     axios.get('/ingredients.json')
    //     .then( (response) => {
    //         dispatch(setIngredientsTHUNK(response.data));
    //     })
    //     .catch( (error) =>{
    //         dispatch(fetchIngredientsFailed());
    //     } );
    // } 


    //WITH SAGAS
    return {
        type: actionTypes.BURGER_INGREDIENTS_INIT
    }
}