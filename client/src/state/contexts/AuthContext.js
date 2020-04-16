import React, { createContext, useReducer, useContext } from 'react';

import axios from 'axios';

import AuthReducer from '../reducers/authReducer';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';
import { returnErrors } from '../actions/errorActions';

import { ErrorContext } from './ErrorContext';

//initial state

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')),
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user')),
};

// create context
export const AuthContext = createContext();

//Provider componenet
export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState);

  const { dispatchError } = useContext(ErrorContext);

  //---------------Actions----------------->
  // Check token & load user
  async function loadUser() {
    // User loading
    dispatch({
      type: USER_LOADING,
    });

    try {
      const user = await axios.get('/api/auth/user', tokenConfig(auth.token));
      dispatch({
        type: USER_LOADED,
        payload: user.data,
      });
    } catch (err) {
      dispatchError(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    }
  }

  //---------------// Register User //--------------------->
  const register = async ({ name, email, password }) => {
    // Headers
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatchError(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({ type: REGISTER_FAIL });
    }
  };
  //---------------// Login User // ----------------------->
  const login = async ({ email, password }) => {
    // Headers
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatchError(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({ type: LOGIN_FAIL });
    }
  };
  //----------------// Logout user //----------------------->
  const logout = () => {
    return dispatch({ type: LOGOUT_SUCCESS });
  };
  //------------------------------------------>

  return (
    <AuthContext.Provider
      value={{
        auth,
        dispatch,
        loadUser,
        register,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Setup config/headers and token
export const tokenConfig = (token) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
