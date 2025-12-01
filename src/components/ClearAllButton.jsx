import React from "react";
// import { useDispatch } from "react-redux";
// import { setFilter } from "../store/actions/filter";

const ClearAllButton = () => {
  //   const dispatch = useDispatch();

  const handleClearAll = () => {
    if (
      window.confirm("Are you sure? This will delete ALL your todos forever!")
    ) {
      // Clear localStorage
      localStorage.removeItem("todoAppData");

      // Reload page to start fresh
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClearAll}
      className="
      
    w-60 
    mt-4
    sm:mt-0            
    sm:w-auto             
    px-6 
    py-3                
    text-sm 
    sm:text-base         
    bg-slate-900 
    hover:bg-slate-800 
    text-white 
    font-bold 
    rounded-lg 
    shadow-lg 
    transform 
    hover:scale-105 
    active:scale-95 
    transition-all 
    duration-200
  "
    >
      Reset All Data (Delete Everything)
    </button>
  );
};

export default ClearAllButton;
