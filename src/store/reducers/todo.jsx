import React from "react";
import {
  ADD_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  ADD_SUBTASK,
  TOGGLE_SUBTASK,
  DELETE_SUBTASK,
  EDIT_SUBTASK,
} from "../actions/todo";
const initialState = [];

function nextSubtaskId(subtasks) {
  // simple id generator per todo
  if (!subtasks || subtasks.length === 0) return 1;
  return Math.max(...subtasks.map((s) => s.id)) + 1;
}

const todo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { text, dueDate = null, subtasks = [] } = action.payload;
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        dueDate: dueDate || null,
        subtasks: subtasks.map((t, i) => ({
          id: i + 1,
          text: t.text,
          completed: false,
        })),
      };
      return [...state, newTodo];
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return state.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
    }
    case EDIT_TODO: {
      const { id, text, dueDate } = action.payload;
      return state.map((t) =>
        t.id === id ? { ...t, text, dueDate: dueDate || null } : t
      );
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return state.filter((t) => t.id !== id);
    }

    case ADD_SUBTASK: {
      const { text, todoId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) return todo;
        const newId = nextSubtaskId(todo.subtasks);
        return {
          ...todo,
          subtasks: [
            ...(todo.subtasks || []),
            {
              id: newId,
              text,
              completed: false,
            },
          ],
        };
      });
    }

    default:
      return state;
  }
};

export default todo;
