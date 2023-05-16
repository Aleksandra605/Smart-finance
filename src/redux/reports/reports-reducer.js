import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  fetchReportsSuccess,
  fetchReportsRequest,
  fetchReportsError,
} from './reports-actions';

//......................................................................

const expensesReports = createReducer([], {
  [fetchReportsSuccess]: (_, { payload }) => payload.expensesReports,
});

const incomesReports = createReducer([], {
  [fetchReportsSuccess]: (_, { payload }) => payload.incomesReports,
});

//......................................................................

const totalExpenses = createReducer([], {
  [fetchReportsSuccess]: (_, { payload }) => payload.totalExpensesForYear,
});

const totalIncomes = createReducer([], {
  [fetchReportsSuccess]: (_, { payload }) => payload.totalIncomesForYear,

  //......................................................................
});

const loading = createReducer(false, {
  [fetchReportsRequest]: () => true,
  [fetchReportsSuccess]: () => false,
  [fetchReportsError]: () => false,
});

//......................................................................

const reportsReducer = combineReducers({
  expensesReports,
  incomesReports,
  totalExpenses,
  totalIncomes,
  // loading,
});

export default reportsReducer;
