import axios from 'axios';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types.js';
import { returnErrors } from './errorActions';

// Auth actions
// Check token & load user
export async function loadUser(dispatch) {
  // User loading
  dispatch({
    type: USER_LOADING,
  });

  const config = tokenConfig();

  try {
    const user = await axios.get('/api/auth/user', config);
    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

// Register USer
export const register = async (dispatch1, dispatch2, user) => {
  // Headers
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  // Request body
  const { name, email, password } = user;
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch1({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch2(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch1({ type: REGISTER_FAIL });
  }
};

// Setup config/headers and token
export const tokenConfig = () => {
  // Get token from localstorage
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    'Content-Type': 'application/json',
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
