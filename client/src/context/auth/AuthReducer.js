export default (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'GET_PROFILE':
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      // put token in local storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};
