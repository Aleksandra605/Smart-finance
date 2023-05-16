import { createAction } from '@reduxjs/toolkit';

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const updateBalanceRequest = createAction('balance/updateBalanceRequest');
const updateBalanceSuccess = createAction('balance/updateBalanceSuccess');
const updateBalanceError = createAction('balance/updateBalanceError');

// const getBalanceRequest = createAction('balance/getBalanceRequest');
// const getBalanceSuccess = createAction('balance/getBalanceSuccess');
// const getBalanceError = createAction('balance/getBalanceError');

export {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  updateBalanceRequest,
  updateBalanceSuccess,
  updateBalanceError,
  // getBalanceRequest,
  // getBalanceSuccess,
  // getBalanceError,
};
