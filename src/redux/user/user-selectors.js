const getBalance = state => {
  return state.user.balance;
};

const getUserId = state => {
  return state.user.userData.userId;
};

const getUser = state => state.user.userData;

const getLoadingStatus = state => state.user.loading;

export { getBalance, getUser, getUserId, getLoadingStatus };
