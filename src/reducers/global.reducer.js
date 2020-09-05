// global states(which will be needed to use anywhere in app) will be kept here.

const globalInitialState = {
  user: null,
  notifications: [],
  favourites: [],
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
    case "ADD_FAVOURITE":
      return {
        ...state,
        user: {
          ...state.user,
          favourites: state.user.favourites.concat(action.payload),
        },
      };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        user: {
          ...state.user,
          favourites: state.user.favourites.filter(
            (item) => item !== action.payload
          ),
        },
      };

    case "SET_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    case "SET_MORE_FAVOURITES":
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    default:
      return state;
  }
};

export { globalInitialState, globalReducer };
