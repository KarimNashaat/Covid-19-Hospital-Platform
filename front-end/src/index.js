import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter} from 'react-router-dom'
import  { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware , compose } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './store/reducers/auth'
import homeReducer from './store/reducers/home'
import hospitalReducer from './store/reducers/hospital'
import appointmentReducer from './store/reducers/appointment'
import userReducer from './store/reducers/user'
import adminReducer from './store/reducers/admin'
import messengerReducer from './store/reducers/messenger'

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  hospital: hospitalReducer,
  appointment: appointmentReducer,
  user: userReducer,
  admin: adminReducer,
  messenger: messengerReducer
})

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = <Provider store={store}><BrowserRouter> <App/> </BrowserRouter></Provider>

ReactDOM.render(app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
