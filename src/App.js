import React, { lazy, useEffect, Suspense } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import {
  getIsAuthenticated,
  getToken,
  getLoadingStatus,
} from './redux/auth/auth-selectors';
import { getCurrentUser } from './redux/user/user-operations';

import Header from './Components/header/Header';
import Loader from './Components/loader/Loader';
import ReportsChart from './Components/reports/reportsChart/ReportsChart';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const SignUp = lazy(() => import('./Components/views/signup/SignUpView'));
const Login = lazy(() => import('./Components/views/login/LoginView'));
const TransactionsPage = lazy(() =>
  import('./Components/transactions/transactionsPage/TransactionsPage'),
);
const ReportsPage = lazy(() =>
  import('./Components/reports/reportsPage/ReportsPage'),
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function App({ onGetCurrentUser, token, loading }) {
  const lastTab = localStorage.getItem('lastTab');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/'
    ) {
      return;
    }
    localStorage.setItem('lastTab', `${location.pathname}`);
  }, [location]);

  useEffect(() => {
    if (token !== null) {
      onGetCurrentUser();
      return navigate(lastTab ? lastTab : '/transactions/expenses', {
        replace: true,
      });
    }
    return navigate('/login', { replace: true });
  }, [token]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loaderBox">
          <Loader />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="loaderBox">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/*" element={<></>} />
            <Route path="/signup" restricted element={<SignUp />} />
            <Route path="/login" restricted element={<Login />}></Route>

            <Route path="/transactions/*" element={<TransactionsPage />} />
            <Route path="reports/*" element={<ReportsPage />}>
              <Route
                path=":type/:year/:month/:category"
                element={<ReportsChart />}
              />
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  token: getToken(state),
  loading: getLoadingStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onGetCurrentUser: () => {
    return dispatch(getCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
