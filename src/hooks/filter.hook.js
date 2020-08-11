import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

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
  return {
    useFilterState,
    updateCategory,
    setSort,
  };
};

export default filterHook;
