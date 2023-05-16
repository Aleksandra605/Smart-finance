import axios from 'axios';

import {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  updateBalanceRequest,
  updateBalanceSuccess,
  updateBalanceError,
} from './user-actions';

axios.defaults.baseURL = 'https://sfbackend-1-q4339617.deta.app/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(getCurrentUserRequest());

  try {
    const response = await axios.get('api/users/current');

    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

const updateBalance = data => dispatch => {
  dispatch(updateBalanceRequest());
  const balance = { balance: Number(data.balance) };

  axios
    .put(`api/users/${data.id}`, balance)
    .then(({ data }) => dispatch(updateBalanceSuccess(data)))
    .catch(error => dispatch(updateBalanceError(error)));
};

export { getCurrentUser, updateBalance };
