import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsError,
  addExpenseSuccess,
  deleteExpenseSuccess,
  deleteIncomeSuccess,
  addIncomeSuccess,
  fetchSummarySuccess,
} from './transaction-actions';

const expenses = createReducer([], {
  [fetchTransactionsSuccess]: (_, { payload }) => payload.Expenses,
  [addExpenseSuccess]: (state, { payload }) => [
    payload.newTransaction,
    ...state,
  ],
  [deleteExpenseSuccess]: (state, { payload }) =>
    state.filter(expense => expense.key !== payload.key),
});

const incomes = createReducer([], {
  [fetchTransactionsSuccess]: (_, { payload }) => payload.Incomes,
  [addIncomeSuccess]: (state, { payload }) => [
    payload.newTransaction,
    ...state,
  ],
  [deleteIncomeSuccess]: (state, { payload }) =>
    state.filter(income => income.key !== payload.key),
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const summaryExpenses = createReducer([], {
  [fetchSummarySuccess]: (_, { payload }) => payload.summaryExpenses,
  [addExpenseSuccess]: (_, { payload }) => payload.summaryExpenses,
  [deleteExpenseSuccess]: (_, { payload }) => payload.summaryExpenses,
});

const summaryIncomes = createReducer([], {
  [fetchSummarySuccess]: (_, { payload }) => payload.summaryIncomes,
  [addIncomeSuccess]: (_, { payload }) => payload.summaryIncomes,
  [deleteIncomeSuccess]: (_, { payload }) => payload.summaryIncomes,
});

const loading = createReducer(false, {
  [fetchTransactionsRequest]: () => true,
  [fetchTransactionsSuccess]: () => false,
  [fetchTransactionsError]: () => false,
});

const transactionsReducer = combineReducers({
  expenses,
  incomes,
  summaryExpenses,
  summaryIncomes,
  // loading,
});

export default transactionsReducer;
