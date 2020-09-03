// global states(which will be needed to use anywhere in app) will be kept here.

const globalInitialState = {
  user: null,
  notifications: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: state.notifications.concat(action.payload),
      };
    default:
      return state;
  }
};

export { globalInitialState, globalReducer };
