import React from "react";
import { ADD_TODO, EDIT_TODO, TOGGLE_TODO, DELETE_TODO } from "../actions/todo";
const initialState = [];

const todo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { text } = action.payload;
      const newTodo = { id: Date.now(), text, completed: false };
      return [...state, newTodo];
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return state.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
    }
    case EDIT_TODO: {
      const { id, text } = action.payload;
      return state.map((t) => (t.id === id ? { ...t, text } : t));
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return state.filter((t) => t.id !== id);
    }

    default:
      return state;
  }
};

export default todo;
