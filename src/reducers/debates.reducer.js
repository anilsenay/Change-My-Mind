const debatesInitialState = {
  debates: {
    isFetched: false,
    results: [],
  },
  lastData: null,

  current_debate: {
    isFetched: false,
    data: null,
    rounds: [],
  },
};

const debatesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEBATES":
      return {
        ...state,
        debates: { results: [...action.payload], isFetched: true },
      };
    case "SET_DEBATES_LAST":
      return {
        ...state,
        lastData: action.payload,
      };
    case "SET_CURRENT_DEBATE":
      return {
        ...state,
        current_debate: { data: action.payload, isFetched: true },
      };
    case "REMOVE_CURRENT_DEBATE":
      return {
        ...state,
        current_debate: { data: null, isFetched: false },
      };

    case "SET_CURRENT_ROUNDS":
      return {
        ...state,
        current_debate: { ...state.current_debate, rounds: action.payload },
      };

    default:
      return state;
  }
};

export { debatesInitialState, debatesReducer };
