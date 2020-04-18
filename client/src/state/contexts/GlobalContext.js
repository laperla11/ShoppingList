import React, { createContext, useContext, useReducer } from 'react';

import axios from 'axios';

import ItemReducer from '../reducers/itemReducer';

import { ErrorContext } from './ErrorContext';
import { AuthContext, tokenConfig } from './AuthContext';
import { returnErrors } from '../actions/errorActions';

import {
  GET_ITEMS,
  CLEAR_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../actions/types';

//initial state

const initialState = {
  items: [
    // { id: 1, name: 'Eggs' },
    // { id: 2, name: 'Milk' },
    // { id: 3, name: 'Steak' },
    // { id: 4, name: 'Water' },
    // { id: 5, name: 'Fruit' },
  ],
  error: null,
  isLoading: true,
};

// create context
export const GlobalContext = createContext();

//Provider componenet
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);

  const { dispatchError } = useContext(ErrorContext);
  const { auth } = useContext(AuthContext);

  //---------------Actions----------------->
  //---------// GET Items /---------------->
  async function getItems() {
    try {
      const res = await axios.get(
        `/api/items/${auth.user ? auth.user.id : null}`
      );
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    } catch (err) {
      console.log({ err });
      // dispatchError(returnErrors(err.response.data, err.response.status));
    }
  }
  //---------// CLEAR ITEMS //---------------->
  async function clearItems() {
    console.log('clear', auth.user.id);
    try {
      await axios.put(
        `/api/items/clear`,
        { userId: auth.user.id },
        tokenConfig(auth.token)
      );

      dispatch({
        type: CLEAR_ITEMS,
        // payload: res.data,
      });
      getItems();
    } catch (err) {
      console.log({ err });
      dispatchError(returnErrors(err.response.data, err.response.status));
    }
  }
  //-------------------------------------->
  //---------// ADD an Item /---------------->
  async function addItem(item) {
    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      const newItem = { name: item, createdBy: auth.user.id };

      const res = await axios.post(
        '/api/items',
        newItem,
        tokenConfig(auth.token)
      );
      // const res = await axios.post('/api/items', newItem, config);

      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
      getItems();
    } catch (err) {
      console.log('add-item', err);
      dispatchError(returnErrors(err.response.data, err.response.status));
    }
  }
  //---------// DELETE an Item //---------------->
  async function deleteItem(id) {
    try {
      await axios.delete(`/api/items/${id}`, tokenConfig(auth.token));

      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
      getItems();
    } catch (err) {
      dispatchError(returnErrors(err.response.data, err.response.status));
    }
  }
  //---------// UPDATE an Item //---------------->
  async function updateItem(id) {
    // console.log('update', id);
    try {
      const res = await axios.put(
        `/api/items/${id}`,
        {},
        tokenConfig(auth.token)
      );

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
      getItems();
    } catch (err) {
      // console.log({ err });
      dispatchError(returnErrors(err.response.data, err.response.status));
    }
  }
  //-------------------------------------->

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        items: state.items,
        error: state.error,
        isLoading: state.isLoading,
        getItems,
        clearItems,
        deleteItem,
        updateItem,
        addItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
