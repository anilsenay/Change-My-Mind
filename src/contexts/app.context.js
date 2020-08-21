import React, { useReducer } from "react";

import PropTypes from "prop-types";

import { filterReducer, filterInitialState } from "../reducers/filter.reducer";
import {
  debatesReducer,
  debatesInitialState,
} from "../reducers/debates.reducer";

const AppContext = React.createContext();
const AppContextDispatch = React.createContext();

const AppProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [debatesState, debatesDispatch] = useReducer(
    debatesReducer,
    debatesInitialState
  );

  return (
    <AppContext.Provider
      value={{
        filterState,
        debatesState,
      }}
    >
      <AppContextDispatch.Provider
        value={{
          filterDispatch,
          debatesDispatch,
        }}
      >
        {children}
      </AppContextDispatch.Provider>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, AppContext, AppContextDispatch };
