import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />

        {/* Instead of component={my_component} */}
        {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
        {/* We can use render= instead in order to pass on some props */}
        {/* HOW TO PASS PROPS ON ROUTES */}
        <Route
          path={props.match.path + "/contact-data"}
          // BEFORE REDUX we had to pass varibles to the component "ContactData" through the router
          // render={ (props) => (<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props} />)}

          //AFTER REDUX we can just read state variables directly from within the ContactData component from REDUX, so we can simply load the component here instead of loading it through the render method and passing variables through it
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
