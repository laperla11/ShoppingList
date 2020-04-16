import React, { createContext, useReducer } from 'react';

import ErrorReducer from '../reducers/errorReducer';

//initial state

const initialState = {
  msg: {},
  status: null,
  id: null,
};

// create context
export const ErrorContext = createContext();

//Provider componenet
export const ErrorProvider = ({ children }) => {
  const [error, dispatchError] = useReducer(ErrorReducer, initialState);

  return (
    <ErrorContext.Provider
      value={{
        error,
        dispatchError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
