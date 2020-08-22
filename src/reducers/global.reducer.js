// global states(which will be needed to use anywhere in app) will be kept here.

const globalInitialState = {
  user: null,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export { globalInitialState, globalReducer };
