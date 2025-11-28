import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "../store/actions/todo";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const saveEdit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      dispatch(deleteTodo(todo.id));
    } else {
      dispatch(editTodo(todo.id, trimmed));
    }
    setEditing(false);
  };

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        todo.completed
          ? "bg-slate-50 border-slate-200"
          : "bg-white border-slate-100"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="w-4 h-4"
      />

      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") {
              setValue(todo.text);
              setEditing(false);
            }
          }}
          autoFocus
          className="flex-1 px-3 py-2 rounded-md border border-slate-200"
        />
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-slate-500" : "text-slate-800"
            }`}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="px-2 py-1 rounded-md border text-black border-slate-200 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="px-2 py-1 rounded-md border border-red-200 text-sm text-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
