import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions/todo";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [subtasks, setSubTasks] = useState([]);
  // const [subtasktext, setSubTaskstext] = useState("");
  const [dueDate, setDueDate] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];

  const onAdd = () => {
    const t = text.trim();
    if (!t) return alert("Please write a todo text.");
    dispatch(addTodo(t, dueDate || null, subtasks));
    setText("");
    setDueDate("");
    setSubTasks([]);
    // setSubTaskstext("");
  };

  // const addSubtaskLocal = () => {
  //   const t = subtasktext.trim();
  //   if (!t) return;
  //   setSubTasks((prev) => [...prev, { text: t }]);
  //   setSubTaskstext("");
  // };

  // const removeSubtaskLocal = (index) => {
  //   setSubTasks((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 w-full mt-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onAdd();
          }}
          placeholder="Add Todo Here And Press Enter to Add"
          type="text"
          className="flex-1 border-2 text-lg border-white rounded-md px-4 p-2 focus:outline-none bg-transparent text-white"
        />
        <button
          onClick={onAdd}
          className="rounded-md bg-slate-800 px-6 py-2 text-white border-2 border-white font-semibold hover:bg-slate-700"
        >
          Add Todo
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <label className="text-white">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={todayDate}
          className="px-3 py-1 border border-white rounded-md bg-transparent text-white"
        />
        <p className="text-sm text-gray-300">(Only today or future dates)</p>
      </div>

      {/* <div>
        <div className="flex gap-2">
          <input
            value={subtasktext}
            onChange={(e) => setSubTaskstext(e.target.value)}
            placeholder="Add subtask here!"
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubtaskLocal();
            }}
            className="flex-1 px-3 py-2 rounded-md border border-white bg-transparent text-white"
          />
          <button
            onClick={addSubtaskLocal}
            className="rounded-md px-3 py-2 border border-white bg-slate-900 text-white font-medium hover:bg-slate-800"
          >
            + Subtask
          </button>
        </div>
        {subtasks.length > 0 && (
          <ul className="mt-2 space-y-2">
            {subtasks.map((s, i) => (
              <li
                key={i}
                className="flex items-center justify-between bg-slate-800 p-2 rounded-md border border-gray-600 text-white"
              >
                <span>{s.text}</span>
                <button
                  onClick={() => removeSubtaskLocal(i)}
                  className="text-red-400 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default TodoInput;
