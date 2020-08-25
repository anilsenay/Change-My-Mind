import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import { quaryValues } from "../consts/sort_values";

const filterHook = () => {
  const { filterState } = useContext(AppContext);
  const { filterDispatch } = useContext(AppContextDispatch);

  const useFilterState = () => {
    return filterState;
  };

  const updateCategory = (value) => {
    filterDispatch({
      type: "UPDATE_CATEGORY_ITEM",
      payload: value,
    });
  };
  const setSort = (value) => {
    filterDispatch({
      type: "SET_SORT",
      payload: value,
    });
  };

  const getActiveFilters = () => {
    return filterState.categories
      .filter((item) => item.isSelected)
      .map((item) => {
        return item.name;
      });
  };
  const getSortValues = () => {
    return quaryValues[filterState.sortSelection];
  };

  return {
    useFilterState,
    updateCategory,
    setSort,
    getActiveFilters,
    getSortValues,
  };
};

export default filterHook;
