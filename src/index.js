import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; 
import createSagaMiddleware from 'redux-saga';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas/index';


const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

// Here we are using two things, REDUX-THUNK AND REDUX DEV TOOLS, because of that we use both compose and applyMiddleware
// process.env.NODE.ENV is set for us when we use the react create script to create our app, otherwise we would have to implement it to have a differentiation between dev and production modes. 
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

//SAGA
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk, sagaMiddleware) ) );

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/fastfood">
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);


ReactDOM.render( app, document.getElementById('root') );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
