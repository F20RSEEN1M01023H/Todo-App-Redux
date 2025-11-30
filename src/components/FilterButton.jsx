import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../store/actions/filter";

const FilterButton = () => {
  const current = useSelector((s) => s.filter);
  const dispatch = useDispatch();

  const btn = (label, f) => (
    <button
      className={`
        px-5 py-3 
        rounded-xl 
        font-semibold 
        text-sm 
        sm:text-base 
        transform 
        hover:scale-105 
        active:scale-95 
        transition-all 
        duration-200 
        min-w-max
        ${
          current === f
            ? "bg-amber-500 text-white shadow-lg"
            : "bg-green-400 text-gray-700 hover:bg-green-500 shadow-md"
        }
      `}
      onClick={() => dispatch(setFilter(f))}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start px-4">
      {btn("All", "ALL")}
      {btn("Active", "ACTIVE")}
      {btn("Done", "DONE")}
    </div>
  );
};

export default FilterButton;
