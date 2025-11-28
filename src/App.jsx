import React from "react";
import TodoInput from "./components/TodoInput";
import FilterButton from "./components/FilterButton";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div
      className="min-h-screen flex items-center text-white  justify-center px-4 bg-linear-to-br from-slate-950 via-gray-700 to-gray-950
    "
    >
      <div className="w-full max-w-2xl lg:max-w-4xl text-center border-2 border-white rounded-2xl p-6 backdrop-blur-3xl shadow-2xl  shadow-black">
        <h1 className="text-3xl font-bold font-mono  underline  underline-offset-8 py-5  decoration-white">
          Todo App React + plain Redux + Tailwind CSS
        </h1>
        <TodoInput />
        <FilterButton />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
