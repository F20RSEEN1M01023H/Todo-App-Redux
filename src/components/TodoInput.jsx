import React, { useState } from "react";

const TodoInput = () => {
  const [text, setText] = useState("");
  return (
    <div className="flex gap-2 mx-auto w-full mt-5 text-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter"}
        placeholder="Add Todo Here And Press Enter to Add"
        type="text"
        className="flex-1 border-2 text-lg border-white rounded-md px-4 p-2 focus:outline-none"
      />
      <button className="rounded-md bg-slate-900 px-6 py-2 border-2 border-white font-semibold">
        Add
      </button>
    </div>
  );
};

export default TodoInput;
