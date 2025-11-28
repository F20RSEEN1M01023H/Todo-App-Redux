import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useSelector((s) => s.todos);
  const filter = useSelector((s) => s.filter);

  const visible = todos.filter((t) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") return !t.completed;
    if (filter === "DONE") return t.completed;
    return true;
  });

  if (!visible.length) {
    return <p className="text-slate-500">No todos yet — add one!</p>;
  }

  return (
    <ul className="space-y-3">
      {visible.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}
