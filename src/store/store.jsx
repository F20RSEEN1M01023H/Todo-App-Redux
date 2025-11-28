import React from "react";
import { createStore, combineReducers } from "redux";
import todoReducer from "./reducers/todo";
import filterReducer from "./reducers/filter";

const rootReducers = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

const store = createStore(rootReducers);

export default store;
