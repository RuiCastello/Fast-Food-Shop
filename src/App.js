import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

//
// Lazy loading
//
const Checkout = React.lazy( ()  =>{
  return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy( ()  =>{
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy( ()  =>{
  return import('./containers/Auth/Auth');
});


const App = (props) => {

  // Two ways of getting the same value within an object:
  // 1 - normal assignment
  // const onTryAutoSignin = props.onTryAutoSignin; 

  //2 - Object destructuring
  const { onTryAutoSignin } = props;

  useEffect( () => {
    onTryAutoSignin();
  }, [onTryAutoSignin]);



  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={ (props) => <Checkout {...props} />} />
        <Route path="/orders" render={ (props) => <Orders {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />}  />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
    );
  }

    return (
      <div>
        <Layout>

          {/* With Routes */}
         
         <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>

          {/* Without routes */}
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
      </div>
    );
}


const mapStateToProps = (state) =>{
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
