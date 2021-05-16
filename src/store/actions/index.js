
// Exporting without wildcards
// We can export things by name or we can simply use a wildcard like below
// This can be better than using wildcards because we sometimes have Action Creators which aren't meant to be used from the outside, but only by other Action Creators  
export { 
    setIngredients,
    addIngredient, 
    removeIngredient,
    initIngredients,
    setIngredientsTHUNK,
    fetchIngredientsFailed
} from './burgerBuilder';

export { 
    purchaseBurger,
    purchaseInit,
    fetchOrders,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFail,
    fetchOrdersStart, 
    fetchOrdersSuccess, 
    fetchOrdersFail
 } from './order';

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState,
    logoutSucceed,
    authStart,
    authSuccess,
    authFail,
    checkAuthTimeout,
    minusOneSecond
} from './auth';










// ALTERNATIVE (not great though, unless all functions are meant to be used externally)
// Exporting using wildcards
// export * from './burgerBuilder';
// export * from './order';
