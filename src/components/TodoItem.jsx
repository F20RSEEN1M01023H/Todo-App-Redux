import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTodo,
  deleteTodo,
  editTodo,
  addSubTask,
  toggleSubTask,
  deleteSubTask,
  editSubTask,
} from "../store/actions/todo";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);
  const [due, setDue] = useState(todo.dueDate || "");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [editingSubtask, setEditingSubtask] = useState({
    subtaskId: null,
    text: "",
  });

  const diffDays = todo.dueDate
    ? Math.ceil((new Date(todo.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const getTimeLeft = (dueDateString) => {
    const due = new Date(dueDateString);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue!";
    if (diffDays === 0) return "Due today!";
    if (diffDays === 1) return "1 day left";
    if (diffDays < 30) return `${diffDays} days left`;
    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} left`;
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""} left`;
  };

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const saveEdit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      dispatch(deleteTodo(todo.id));
    } else {
      dispatch(editTodo(todo.id, trimmed, due || null));
    }
    setEditing(false);
  };

  const addSubtaskLocal = () => {
    const t = subtaskInput.trim();
    if (!t) return;
    dispatch(addSubTask(todo.id, t));
    setSubtaskInput("");
  };

  const saveSubEdit = (subId) => {
    const trimmed = editingSubtask.text.trim();
    if (trimmed) {
      dispatch(editSubTask(todo.id, subId, trimmed));
    }
    setEditingSubtask({ subtaskId: null, text: "" });
  };

  return (
    <li
      className={`flex flex-col p-4 rounded-lg border shadow-md ${
        isOverdue
          ? "border-red-500 border-2 bg-red-200"
          : todo.completed
          ? "bg-slate-50  border-2"
          : "bg-gray-200 border-slate-400 border-2"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex gap-2 items-center w-full">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="w-5 h-5 border border-slate-400 flex-shrink-0"
          />
          {editing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") {
                  setValue(todo.text);
                  setEditing(false);
                }
              }}
              autoFocus
              className="flex-1 px-3 py-2 rounded-md border-2 border-slate-400 "
            />
          ) : (
            <span
              className={`flex-1 text-lg 
              ${
                todo.completed
                  ? "line-through text-slate-500 "
                  : "text-slate-800 border border-slate-400 rounded-md"
              }
             ${isOverdue ? "text-red-600" : ""}`}
              onDoubleClick={() => setEditing(true)}
            >
              {todo.text}
            </span>
          )}
        </div>
        {/* Due Date + Time Left Badge – Both Shown Together */}
        {todo.dueDate && (
          <div className="flex items-center gap-3">
            {/* The Date */}
            <span className="text-sm text-slate-500">
              Due: {formatDate(todo.dueDate)}
            </span>

            {/* The Countdown Badge */}
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                isOverdue
                  ? "bg-red-100 text-red-700 border-red-300"
                  : diffDays <= 0
                  ? "bg-orange-100 text-orange-700 border-orange-300"
                  : diffDays <= 7
                  ? "bg-amber-100 text-amber-700 border-amber-300"
                  : "bg-green-100 text-green-700 border-green-300"
              }`}
            >
              {getTimeLeft(todo.dueDate)}
            </span>
          </div>
        )}
        <div className="flex sm:flex-row gap-2 justify-between items-center w-full sm:w-auto">
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-1 rounded-md border border-slate-400 text-sm hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="px-3 py-1 rounded-md border border-red-400 text-sm text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-2 flex items-center gap-2">
          <label className="text-sm text-slate-600">Due:</label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="px-3 py-1 rounded-md border border-slate-200"
          />
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-700">Subtasks</h4>
        {todo.subtasks && todo.subtasks.length > 0 ? (
          <ul className="space-y-2 mt-2">
            {todo.subtasks.map((s) => (
              <li
                key={s.id}
                className="flex flex-col sm:flex-row items-center gap-2 bg-slate-100 border border-slate-400 p-2 rounded-md"
              >
                <div className="w-full flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={s.completed}
                    onChange={() => dispatch(toggleSubTask(todo.id, s.id))}
                    className="w-4 h-4"
                  />
                  {editingSubtask.subtaskId === s.id ? (
                    <input
                      value={editingSubtask.text}
                      onChange={(e) =>
                        setEditingSubtask({
                          ...editingSubtask,
                          text: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveSubEdit(s.id);
                        if (e.key === "Escape")
                          setEditingSubtask({ subtaskId: null, text: "" });
                      }}
                      autoFocus
                      className="flex-1 px-2 py-1 rounded-md border border-slate-200"
                    />
                  ) : (
                    <span
                      className={`flex-1  ${
                        s.completed
                          ? "line-through text-slate-500"
                          : "text-slate-800 border w-full border-slate-400 rounded-md "
                      }`}
                    >
                      {s.text}
                    </span>
                  )}
                </div>
                <div className="flex justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <button
                    onClick={() =>
                      setEditingSubtask({ subtaskId: s.id, text: s.text })
                    }
                    className="text-sm text-blue-600 border px-3 py-0.5 rounded-md border-slate-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteSubTask(todo.id, s.id))}
                    className="text-sm text-red-600 border px-3 py-0.5 rounded-md border-red-400"
                  >
                    Del
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No subtasks yet</p>
        )}

        <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
          <input
            placeholder="Add subtask and press +"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubtaskLocal();
            }}
            className="flex-1 px-3 py-2 rounded-md border border-slate-400"
          />
          <button
            onClick={addSubtaskLocal}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
