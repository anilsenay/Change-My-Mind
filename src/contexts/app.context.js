import React, { useReducer } from "react";

import PropTypes from "prop-types";

import { filterReducer, filterInitialState } from "../reducers/filter.reducer";
import {
  debatesReducer,
  debatesInitialState,
} from "../reducers/debates.reducer";
import {
  profileReducer,
  profileInitialState,
} from "../reducers/profile.reducer";
import { globalReducer, globalInitialState } from "../reducers/global.reducer";

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
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    globalInitialState
  );
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitialState
  );
  return (
    <AppContext.Provider
      value={{
        filterState,
        debatesState,
        globalState,
        profileState,
      }}
    >
      <AppContextDispatch.Provider
        value={{
          filterDispatch,
          debatesDispatch,
          globalDispatch,
          profileDispatch,
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
