const getExpenses = state => state.transactions.expenses;
const getIncomes = state => state.transactions.incomes;
const getSummaryExpenses = state => state.transactions.summaryExpenses;
const getSummaryIncomes = state => state.transactions.summaryIncomes;

export { getExpenses, getIncomes, getSummaryExpenses, getSummaryIncomes };
