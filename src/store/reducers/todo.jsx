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
  if (!subtasks || subtasks.length === 0) return 1;
  return Math.max(...subtasks.map((s) => s.id)) + 1;
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { text, dueDate = null, subtasks = [] } = action.payload;
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        dueDate: dueDate || null,
        subtasks: subtasks.map((st, i) => ({
          id: i + 1,
          text: st.text,
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
      const { todoId, text } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) return todo;
        const newId = nextSubtaskId(todo.subtasks);
        return {
          ...todo,
          subtasks: [
            ...(todo.subtasks || []),
            { id: newId, text, completed: false },
          ],
        };
      });
    }
    case TOGGLE_SUBTASK: {
      const { todoId, subtaskId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          subtasks: todo.subtasks.map((s) =>
            s.id === subtaskId ? { ...s, completed: !s.completed } : s
          ),
        };
      });
    }
    case EDIT_SUBTASK: {
      const { todoId, subtaskId, text } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          subtasks: todo.subtasks.map((s) =>
            s.id === subtaskId ? { ...s, text } : s
          ),
        };
      });
    }
    case DELETE_SUBTASK: {
      const { todoId, subtaskId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          subtasks: todo.subtasks.filter((s) => s.id !== subtaskId),
        };
      });
    }
    default:
      return state;
  }
};

export default todoReducer;
