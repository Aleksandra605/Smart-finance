import { createAction } from '@reduxjs/toolkit';

const signUpRequest = createAction('auth/signUpRequest');
const signUpSuccess = createAction('auth/signUpSuccess');
const signUpError = createAction('auth/signUpError');

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const updateBalanceRequest = createAction('balance/updateBalanceRequest');
const updateBalanceSuccess = createAction('balance/updateBalanceSuccess');
const updateBalanceError = createAction('balance/updateBalanceError');

const getBalanceRequest = createAction('balance/getBalanceRequest');
const getBalanceSuccess = createAction('balance/getBalanceSuccess');
const getBalanceError = createAction('balance/getBalanceError');

const isAuthenticatedFalse = createAction('auth/isAuthenticatedFalse');
const isAuthenticatedTrue = createAction('auth/isAuthenticatedTrue');

export {
  signUpRequest,
  signUpSuccess,
  signUpError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  updateBalanceRequest,
  updateBalanceSuccess,
  updateBalanceError,
  getBalanceRequest,
  getBalanceSuccess,
  getBalanceError,
  isAuthenticatedFalse,
  isAuthenticatedTrue,
};
