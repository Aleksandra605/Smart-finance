import { createAction } from '@reduxjs/toolkit';

export const addExpenseRequest = createAction('transactions/addExpenseRequest');
export const addExpenseSuccess = createAction('transactions/addExpenseSuccess');
export const addExpenseError = createAction('transactions/addExpenseError');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const addIncomeRequest = createAction('transactions/addIncomeRequest');
export const addIncomeSuccess = createAction('transactions/addIncomeSuccess');
export const addIncomeError = createAction('transactions/addIncomeError');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const fetchTransactionsRequest = createAction(
  'transactions/fetchTransactionsRequest'
);
export const fetchTransactionsSuccess = createAction(
  'transactions/fetchTransactionsSuccess'
);
export const fetchTransactionsError = createAction(
  'transactions/fetchTransactionsError'
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const fetchSummaryRequest = createAction(
  'transactions/fetchSummaryRequest'
);

export const fetchSummarySuccess = createAction(
  'transactions/fetchSummarySuccess'
);

export const fetchSummaryError = createAction('transactions/fetchSummaryError');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const deleteExpenseRequest = createAction(
  'transactions/deleteExpenseRequest'
);
export const deleteExpenseSuccess = createAction(
  'transactions/deleteExpenseSuccess'
);
export const deleteExpenseError = createAction(
  'transactions/deleteExpenseError'
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const deleteIncomeRequest = createAction(
  'transactions/deleteIncomeRequest'
);
export const deleteIncomeSuccess = createAction(
  'transactions/deleteIncomeSuccess'
);
export const deleteIncomeError = createAction('transactions/deleteIncomeError');
