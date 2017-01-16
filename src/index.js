import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import Routes from './Routes';
import reducers from './reducers';
import styles from '../assets/scss/styles.scss';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, window.__INITIAL_STATE__, composeEnhancers(
 applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>, document.querySelector('.container')
);
