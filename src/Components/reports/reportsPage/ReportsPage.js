import { useState, useEffect } from 'react';
import { Link, Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Balance from '../../balance/Balance';
import ReportsList from '../reportsList/ReportsList';
import SvgGenerator from '../../svg-generator/SvgGenerator';
import TotalAmounts from '../reportsTotalAmounts/TotalAmounts';

import { getLoadingStatus } from '../../../redux/user/user-selectors';
import { fetchReports } from '../../../redux/reports/reports-operations';
import { getIsAuthenticated } from '../../../redux/auth/auth-selectors';

import DateSelector from '../dateSelector/DateSelector';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { monthsList } from '../../../helpers/dates';
import Loader from '../../loader/Loader';
import s from './_reportsPage.module.scss';

//...........................................................................

function ReportsPage({ loading, fetchReports, isAuthenticated }) {
  const [currentTransactionsType, setCurrentTransactionsType] = useLocalStorage(
    'currentTransactionsType',
    'EXPENSES',
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(
    monthsList[new Date().getMonth()],
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(
        `/reports/${currentTransactionsType}/${currentYear}/${currentMonth}`,
        {
          replace: true,
        },
      );
    }
    return navigate('/login', { replace: true });
  }, [currentTransactionsType, currentYear, currentMonth]);

  //...........................................................................

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
    }
  }, []);

  //...........................................................................

  const handleChangeTransType = () => {
    currentTransactionsType === 'EXPENSES'
      ? setCurrentTransactionsType('INCOMES')
      : setCurrentTransactionsType('EXPENSES');
  };

  const handleChangeCurrentYear = value => {
    return setCurrentYear(value);
  };

  const handleChangeCurrentMonth = value => {
    return setCurrentMonth(value);
  };

  //...........................................................................

  return (
    <section className={s.section}>
      <div className={s.div1}>
        <Link to="/transactions" className={s.link}>
          <SvgGenerator name="arrow go back" /> Transactions
        </Link>
        <Balance />
        <DateSelector
          handleChangeCurrentYear={handleChangeCurrentYear}
          handleChangeCurrentMonth={handleChangeCurrentMonth}
        />
      </div>

      <TotalAmounts currentYear={Number(currentYear)} />

      {loading ? (
        <div className={s.loaderBox}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={s.reportsBox}>
            <div className={s.transactionTypeBox}>
              <button className={s.btnNext} onClick={handleChangeTransType}>
                <SvgGenerator name="Vector left" />
              </button>

              <p className={s.transactionName}>{currentTransactionsType}</p>

              <button className={s.btnNext} onClick={handleChangeTransType}>
                <SvgGenerator name="Vector right" />
              </button>
            </div>

            <Routes>
              <Route
                path=":type/:year/:month/*"
                element={
                  <ReportsList
                    year={Number(currentYear)}
                    month={currentMonth}
                    type={currentTransactionsType}
                  />
                }
              />
            </Routes>
          </div>
        </>
      )}
      <Outlet />
    </section>
  );
}

const mapStateToProps = state => ({
  loading: getLoadingStatus(state),
  isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  fetchReports: () => {
    return dispatch(fetchReports());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPage);
