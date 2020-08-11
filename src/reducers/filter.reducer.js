import { categories as initCategories } from "../consts/filter_categories";

const filterInitialState = {
  categories: initCategories,
  sortSelection: "started-new-to-old",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY_ITEM":
      return {
        ...state,
        categories: state.categories.map((item) =>
          item.name === action.payload
            ? { name: item.name, isSelected: !item.isSelected }
            : { name: item.name, isSelected: item.isSelected }
        ),
      };
    case "SET_SORT":
      return {
        ...state,
        sortSelection: action.payload,
      };
    default:
      return state;
  }
};

export { filterInitialState, filterReducer };
