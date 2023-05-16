const getTotalAmountExpense = state => state.reports.totalExpenses;
const getTotalAmountIncomes = state => state.reports.totalIncomes;
const getExpensesReports = state => state.reports.expensesReports;
const getIncomesReports = state => state.reports.incomesReports;

const getReportByCategory = state =>
  state.reports.reportByCategory.reportByCategory;

const getMonthsListExpenses = state => state.reports.monthListExpenses;
const getMonthsListIncomes = state => state.reports.monthListIncomes;

export {
  getTotalAmountExpense,
  getTotalAmountIncomes,
  getExpensesReports,
  getIncomesReports,
  getReportByCategory,
  getMonthsListExpenses,
  getMonthsListIncomes,
};
