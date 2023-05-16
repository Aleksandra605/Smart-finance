import { createAction } from '@reduxjs/toolkit';

export const fetchReportsRequest = createAction('reports/fetchReportsRequest');
export const fetchReportsSuccess = createAction('reports/fetchReportsSuccess');
export const fetchReportsError = createAction('reports/fetchReportsError');

export const fetchReportsByCategoryRequest = createAction(
  'reports/fetchReportsByCategory'
);
export const fetchReportsByCategorySuccess = createAction(
  'reports/fetchReportsByCategorySuccess'
);
export const fetchReportsByCategoryError = createAction(
  'reports/fetchReportsByCategoryError'
);
