import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as authActions from './auth-actions';
import * as userActions from '../user/user-actions';
// import * as transactionActions from '../transactions/transaction-actions';
//import * as reportsActions from '../reports/reports-actions';

const parsedAuthToken = JSON.parse(localStorage.getItem('persist:auth'));

const token = createReducer(null, {
  [authActions.signUpSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
  [userActions.getCurrentUserError]: () => null,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.signUpError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
});

const isAuthenticated = createReducer(
  parsedAuthToken?.token == 'null' ? false : true,
  {
    [authActions.signUpSuccess]: () => true,
    [authActions.loginSuccess]: () => true,
    [authActions.getCurrentUserSuccess]: () => true,
    [authActions.signUpError]: () => false,
    [authActions.logoutError]: () => false,
    [authActions.getCurrentUserError]: () => false,
    [authActions.logoutSuccess]: () => false,
    [userActions.getCurrentUserError]: () => false,
  },
);

const loading = createReducer(false, {
  [authActions.signUpRequest]: () => true,
  [authActions.signUpSuccess]: () => false,
  [authActions.signUpError]: () => false,

  [authActions.loginRequest]: () => true,
  [authActions.loginSuccess]: () => false,
  [authActions.loginError]: () => false,

  [authActions.logoutRequest]: () => true,
  [authActions.logoutSuccess]: () => false,
  [authActions.logoutError]: () => false,
});

const authReducer = combineReducers({
  isAuthenticated,
  token,
  error,
  loading,
});

export default authReducer;
