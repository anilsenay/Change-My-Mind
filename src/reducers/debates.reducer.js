const debatesInitialState = {
  debates: {
    isFetched: false,
    results: [],
  },
};

const debatesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEBATES":
      return {
        ...state,
        debates: { results: [...action.payload], isFetched: true },
      };
    default:
      return state;
  }
};

export { debatesInitialState, debatesReducer };
