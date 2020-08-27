// storing profile data which showing currently

const profileInitialState = {
  profile: {
    isFetched: false,
    data: null,
  },
  debates: {
    isFetched: false,
    data: [],
  },
};

const profileReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: { data: action.payload, isFetched: true },
      };
    case "SET_PROFILE_DEBATES":
      return {
        ...state,
        debates: {
          data: [...new Set(state.debates.data.concat(action.payload))],
          isFetched: true,
        },
      };
    case "REMOVE_PROFILE_STATE":
      return {
        ...state,
        profile: { data: null, isFetched: false },
        debates: { data: [], isFetched: false },
      };

    default:
      return state;
  }
};

export { profileInitialState, profileReducer };
