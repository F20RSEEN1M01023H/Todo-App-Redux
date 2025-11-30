import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../store/actions/filter";

const FilterButton = () => {
  const current = useSelector((s) => s.filter);
  const dispatch = useDispatch();

  const btn = (label, f) => (
    <button
      className={`px-4  rounded-md font-medium transform hover:scale-105 ${
        current === f
          ? "bg-amber-500 text-white"
          : "bg-green-400 text-gray-700 hover:bg-green-500"
      }`}
      onClick={() => dispatch(setFilter(f))}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-2">
      {btn("All", "ALL")}
      {btn("Active", "ACTIVE")}
      {btn("Done", "DONE")}
    </div>
  );
};

export default FilterButton;
