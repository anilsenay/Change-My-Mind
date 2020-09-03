const exploreInitialState = {
  popular: {
    isFetched: false,
    results: [],
    lastData: null,
  },
  news: {
    isFetched: false,
    results: [],
    lastData: null,
  },
  mostVoted: {
    isFetched: false,
    results: [],
    lastData: null,
  },
  newUpdated: {
    isFetched: false,
    results: [],
    lastData: null,
  },
};

const exploreReducer = (state, action) => {
  switch (action.type) {
    case "SET_POPULAR_DEBATES":
      return {
        ...state,
        popular: { results: [...action.payload], isFetched: true },
      };
    case "SET_POPULAR_LAST":
      return {
        ...state,
        popular: { ...state.popular, lastData: action.payload },
      };
    case "SET_NEW_DEBATES":
      return {
        ...state,
        news: { results: [...action.payload], isFetched: true },
      };
    case "SET_NEW_LAST":
      return {
        ...state,
        news: { ...state.news, lastData: action.payload },
      };
    case "SET_MOST_VOTED_DEBATES":
      return {
        ...state,
        mostVoted: { results: [...action.payload], isFetched: true },
      };
    case "SET_MOST_VOTED_LAST":
      return {
        ...state,
        mostVoted: { ...state.mostVoted, lastData: action.payload },
      };
    case "SET_UPDATED_DEBATES":
      return {
        ...state,
        newUpdated: { results: [...action.payload], isFetched: true },
      };
    case "SET_UPDATED_LAST":
      return {
        ...state,
        newUpdated: { ...state.newUpdated, lastData: action.payload },
      };
    default:
      return state;
  }
};

export { exploreInitialState, exploreReducer };
