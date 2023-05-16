import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as authActions from '../auth/auth-actions';
import * as userACtions from './user-actions';
import * as transactionActions from '../transactions/transaction-actions';
import * as reportsActions from '../reports/reports-actions';

const userInitialState = { name: null, email: null };

const userData = createReducer(userInitialState, {
  [authActions.signUpSuccess]: (_, { payload }) => payload.userInfo,
  [authActions.loginSuccess]: (_, { payload }) => payload.userInfo,
  [authActions.logoutSuccess]: () => userInitialState,
  [userACtions.getCurrentUserSuccess]: (_, { payload }) => payload,
  [userACtions.updateBalanceSuccess]: (_, { payload }) => payload.userInfo,
});

const balanceInitialState = 0;

const balance = createReducer(balanceInitialState, {
  [authActions.signUpSuccess]: (_, { payload }) => payload.userInfo.balance,
  [authActions.loginSuccess]: (_, { payload }) => payload.userInfo.balance,
  [userACtions.getCurrentUserSuccess]: (_, { payload }) => payload.balance,
  [userACtions.updateBalanceSuccess]: (_, { payload }) =>
    payload.userInfo.balance,

  [transactionActions.addExpenseSuccess]: (_, { payload }) => payload.balance,
  [transactionActions.addIncomeSuccess]: (_, { payload }) => payload.balance,
  [transactionActions.deleteExpenseSuccess]: (_, { payload }) =>
    payload.balance,
  [transactionActions.deleteIncomeSuccess]: (_, { payload }) => payload.balance,
});

const loading = createReducer(false, {
  [transactionActions.fetchTransactionsRequest]: () => true,
  [transactionActions.fetchTransactionsSuccess]: () => false,
  [transactionActions.fetchTransactionsError]: () => false,
  [reportsActions.fetchReportsRequest]: () => true,
  [reportsActions.fetchReportsSuccess]: () => false,
  [reportsActions.fetchReportsError]: () => false,
});

const userReducer = combineReducers({
  userData,
  balance,
  loading,
});

export default userReducer;
