import React, { useReducer } from "react";

import PropTypes from "prop-types";

import { filterReducer, filterInitialState } from "../reducers/filter.reducer";

const AppContext = React.createContext();
const AppContextDispatch = React.createContext();

const AppProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );

  return (
    <AppContext.Provider
      value={{
        filterState,
      }}
    >
      <AppContextDispatch.Provider
        value={{
          filterDispatch,
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
