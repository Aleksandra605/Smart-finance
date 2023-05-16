import { Route, NavLink, Routes, Outlet } from 'react-router-dom';
import { lazy } from 'react';
import { connect } from 'react-redux';

import {
  deleteExpense,
  deleteIncome,
} from '../../../redux/transactions/transaction-operations';
import {
  getExpenses,
  getIncomes,
  getSummaryExpenses,
  getSummaryIncomes,
} from '../../../redux/transactions/transaction-selectors';

import TransactionForm from '../form/Form';
import Summary from '../summary/Summary';
import s from './_transactionsView.module.scss';

//....................................................................

const TransactionsList = lazy(() =>
  import('../transactionsList/TransactionsList'),
);

//.....................................................................

function TransactionsView({
  expenses,
  incomes,
  onDeleteExpense,
  onDeleteIncome,
  summaryExpenses,
  summaryIncomes,
}) {
  return (
    <>
      <nav className={s.navigation}>
        <NavLink
          to="/transactions/expenses"
          className={s.navLink}
          style={({ isActive }) => ({
            boxShadow: isActive ? null : 'none',
            color: isActive ? '#886aff' : '#79819c',
          })}
        >
          EXPENSES
        </NavLink>
        <NavLink
          to="/transactions/incomes"
          className={s.navLink}
          style={({ isActive }) => ({
            boxShadow: isActive ? null : 'none',
            color: isActive ? '#886aff' : '#79819c',
          })}
        >
          INCOMES
        </NavLink>
      </nav>

      <section className={s.transactionsSection}>
        <TransactionForm />
        <div className={s.transactionsContainer}>
          <Outlet />
          <Routes>
            <Route
              path="/expenses"
              exact
              element={
                <>
                  <TransactionsList
                    data={expenses}
                    onDelete={onDeleteExpense}
                  />
                  {summaryExpenses.length > 0 ? (
                    <Summary data={summaryExpenses} />
                  ) : null}
                </>
              }
            />

            <Route
              path="/incomes"
              exact
              element={
                <>
                  <TransactionsList data={incomes} onDelete={onDeleteIncome} />
                  {summaryIncomes.length > 0 ? (
                    <Summary data={summaryIncomes} />
                  ) : null}
                </>
              }
            />
          </Routes>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  expenses: getExpenses(state),
  incomes: getIncomes(state),
  summaryExpenses: getSummaryExpenses(state),
  summaryIncomes: getSummaryIncomes(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteExpense: data => {
    return dispatch(deleteExpense(data));
  },
  onDeleteIncome: data => {
    return dispatch(deleteIncome(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);
