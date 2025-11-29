export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";

// sub tasks
export const ADD_SUBTASK = "ADD_SUBTASK";
export const TOGGLE_SUBTASK = "TOGGLE_SUBTASK";
export const EDIT_SUBTASK = "EDIT_SUBTASK";
export const DELETE_SUBTASK = "DELETE_SUBTASK";

export const addTodo = (text, dueDate = null, subTasks = []) => ({
  type: ADD_TODO,
  payload: { text, dueDate, subTasks },
});
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: { id } });
export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: { text, id },
});
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: { id } });

// subtasks notes

export const addSubTask = (todoId, text) => ({
  type: ADD_SUBTASK,
  payload: { todoId, text },
});
export const toggleSubTask = (todoId, subtaskId) => ({
  type: TOGGLE_SUBTASK,
  payload: { todoId, subtaskId },
});
export const editSubTask = (todoId, subtaskId, text) => ({
  type: EDIT_SUBTASK,
  payload: { todoId, subtaskId, text },
});
export const deleteSubTask = (todoId, subtaskId) => ({
  type: DELETE_SUBTASK,
  payload: { todoId, subtaskId },
});
