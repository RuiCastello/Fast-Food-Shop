import { useState, useEffect, Fragment, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect, useDispatch, useSelector } from "react-redux";

// WITHOUT actionCreators
// If we are going to use actionCreators then we don't use the actionTypes here
// import * as actionTypes from '../../store/actions/actionTypes';

// WITH actionCreators
import * as actions from "../../store/actions/index";

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7,
// }

const BurgerBuilder = (props) => {
  // constructor(props){
  //     super(props);
  //     this.state = {};
  // }

  const [message, setMessage] = useState("");
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);


// ALTERNATIVE TO USING mapDispatchToProps method with connect()
// WITH USEDISPATCH (useDispatch)
// WE DONT NEED TO USE PROPS ANYMORE WITH THIS METHOD
// FUNCTIONS ARE PASSED DIRECTLY to the component, WITHOUT GOING THROUGH PROPS
  const dispatch = useDispatch();
  const onSetIngredients = (ingredients) => dispatch(actions.setIngredients(ingredients));
  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));


// ALTERNATIVE TO mapStateToProps
// WE CAN ALTERNATIVELY USE A HOOK CALLED useSelector which skips props entirely, just like useDispatch does to Dispatch functions.
const { ings, totalPrice, error, isAuthenticated } = useSelector( (state) => { 
  return { 
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
});



  // const { onInitIngredients } = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    // const ingredients = { ...this.state.ingredients };
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    // We can read the state variables directly from any component, so no need for any query string mambo
    props.history.push("/checkout");
  };

  let disabledInfo = {};
  const ingredients = { ...ings };
  Object.entries(ingredients).forEach(([type, quantity]) => {
    if (quantity > 0) disabledInfo[type] = false;
    else disabledInfo[type] = true;
  });

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

  if (ings) {
    orderSummary = (
      <OrderSummary
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ings}
        price={totalPrice}
      />
    );

    burger = (
      <Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          price={totalPrice}
          order={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Fragment>
    );
  }

  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {message !== "" ? <p>{message}</p> : ""}
      {burger}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // WITHOUT using actionCreators
    // onSetIngredients: (ingredients) => dispatch({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients}),
    // onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    // onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),

    // WITH ACTION CREATORS

    // onSetIngredients uses axios here in the component and doesn't rely on async code inside redux, WITHOUT redux THUNK
    onSetIngredients: (ingredients) =>
      dispatch(actions.setIngredients(ingredients)),
    onIngredientAdded: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),

    // onInitIngredients uses async code inside the action creators using redux THUNK, it's an alternative to onSetIngredients()
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
