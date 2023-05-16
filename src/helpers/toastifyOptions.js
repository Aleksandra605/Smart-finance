const updateBalanceSuccess = {
  text: 'Your balance has been updated.',
  className: 'success',
  stopOnFocus: true,
  autoClose: 50000,
  style: {
    background: 'rgb(124,95,255)',
    background:
      'linear-gradient(90deg, rgba(124,95,255,1) 31%, rgba(24,220,255,1) 100%)',
  },
};

const loginErrorOption = {
  text: 'User not found',
  className: 'error',
  stopOnFocus: true,
  autoClose: 50000,
  style: {
    background: 'rgb(255, 0, 0)',
  },
};

const signupErrorOption = {
  text: 'A user already exists',
  className: 'error',
  stopOnFocus: true,
  autoClose: 50000,
  style: {
    background: 'rgb(255, 0, 0)',
  },
};

export { updateBalanceSuccess, loginErrorOption, signupErrorOption };
