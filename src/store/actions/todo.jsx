export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "ADD_TODO";

export const addTodo = (text) => ({ type: ADD_TODO, payload: { text } });
export const toggleTodo = (id) => ({ type: ADD_TODO, payload: { id } });
export const editTodo = (id, text) => ({
  type: ADD_TODO,
  payload: { text, id },
});
export const deleteTodo = (id) => ({ type: ADD_TODO, payload: { id } });
