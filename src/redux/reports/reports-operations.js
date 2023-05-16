import {
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsError,
} from './reports-actions';
import axios from 'axios';

axios.defaults.baseURL = 'https://sfbackend-1-q4339617.deta.app/';

const fetchReports = () => async dispatch => {
  dispatch(fetchReportsRequest());

  await axios
    .get('api/transactions/reports')
    .then(({ data }) => dispatch(fetchReportsSuccess(data)))
    .catch(error => dispatch(fetchReportsError(error)));
};

export { fetchReports };
