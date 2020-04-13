import React, { createContext, useReducer } from 'react';

import axios from 'axios';

import AppReducer from './AppReducer';

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
export const GlobalContext = createContext(initialState);

//Provider componenet
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getItems() {
    try {
      const res = await axios.get('/api/items');
      dispatch({
        type: 'GET_ITEMS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'ITEMS_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteItem(id) {
    try {
      await axios.delete(`/api/items/${id}`);

      dispatch({
        type: 'DELETE_ITEM',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'ITEMS_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addItem(item) {
    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      const newItem = { name: item };

      const res = await axios.post('/api/items', newItem);
      // const res = await axios.post('/api/items', newItem, config);

      dispatch({
        type: 'ADD_ITEM',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'ITEMS_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        items: state.items,
        error: state.error,
        isLoading: state.isLoading,
        getItems,
        deleteItem,
        addItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
