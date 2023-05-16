import axios from 'axios';
import {
  signUpRequest,
  signUpSuccess,
  signUpError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
} from './auth-actions';

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {
  loginErrorOption,
  signupErrorOption,
} from '../../helpers/toastifyOptions';

axios.defaults.baseURL = 'https://sfbackend-1-q4339617.deta.app/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUp = credentials => async dispatch => {
  dispatch(signUpRequest());

  try {
    const response = await axios.post('api/users/signup', credentials);

    token.set(response.data.token);

    dispatch(signUpSuccess(response.data));
  } catch (error) {
    dispatch(signUpError(error.message));
    Toastify(signupErrorOption).showToast();
  }
};

const logIn = credentials => async dispatch => {
  dispatch(loginRequest());

  try {
    const response = await axios.post('api/users/login', credentials);

    token.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error.message));
    Toastify(loginErrorOption).showToast();
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.get('api/users/logout');

    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

export { signUp, logOut, logIn };
