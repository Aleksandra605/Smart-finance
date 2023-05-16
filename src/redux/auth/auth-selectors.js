const getIsAuthenticated = state => state.auth.isAuthenticated;
const getToken = state => state.auth.token;
const getLoadingStatus = state => state.auth.loading;

export { getIsAuthenticated, getToken, getLoadingStatus };
