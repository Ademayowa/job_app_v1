import React, { useReducer, createContext } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  profile: null,
  error: null,
  loading: true,
};

// Create context
export const AuthContext = createContext(initialState);

// Component provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('api/v1/auth/current');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/auth/sign-up', formData, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('api/v1/auth/sign-in', formData, config);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  // Get profile
  async function getProfile() {
    try {
      const res = await axios.get('api/v1/profiles');

      loadUser();
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Create profile
  const createProfile = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('api/v1/profile', formData, config);

      dispatch({
        type: 'CREATE_PROFILE',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: err.response.data.msg,
      });
    }
  };

  // Logout user
  const logout = () =>
    dispatch({ type: 'LOGOUT' }, dispatch({ type: 'CLEAR_PROFILE' }));

  // Clear errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        profile: state.profile,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        getProfile,
        clearErrors,
        createProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
