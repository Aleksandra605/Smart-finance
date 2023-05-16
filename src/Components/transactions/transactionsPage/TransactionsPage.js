import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import {
  fetchTransactions,
  fetchSummaryList,
} from '../../../redux/transactions/transaction-operations';
import { getIsAuthenticated } from '../../../redux/auth/auth-selectors';
import { getLoadingStatus } from '../../../redux/user/user-selectors';

import TransactionsView from '../transactionsView/TransactionsView';
import Balance from '../../balance/Balance';
import SvgGenerator from '../../svg-generator/SvgGenerator';
import Loader from '../../loader/Loader';

import s from './_transactionsPage.module.scss';
import '../../../App.scss';

function TransactionsPage({
  isAuthenticated,
  fetchSummaryList,
  fetchTransactionsList,
  loading,
}) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate('/login', { replace: true });
    }
    if (isFirstRender.current) {
      fetchTransactionsList();
      fetchSummaryList();
      isFirstRender.current = false;
    }
    return;
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('lastTab', location.pathname);
  }, [location]);

  return (
    <section className={s.transactions__section}>
      <div className={s.balance__container}>
        <Balance />
        <Link to="/reports" className={s.linkToReports}>
          Reports
          <SvgGenerator name="reports icon" />
        </Link>
      </div>

      <div className={s.transactionsView__container}>
        {loading ? <Loader /> : <TransactionsView />}
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  loading: getLoadingStatus(state),
  isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  fetchTransactionsList: () => {
    return dispatch(fetchTransactions());
  },
  fetchSummaryList: () => {
    return dispatch(fetchSummaryList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
