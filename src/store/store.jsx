import { createStore, combineReducers } from "redux";
import todoReducer from "./reducers/todo";
import filterReducer from "./reducers/filter";

// 1. Load saved data from localStorage when app starts
const loadState = () => {
  try {
    const savedData = localStorage.getItem("todoAppData");
    if (savedData === null) {
      return undefined; // No saved data → use default
    }
    return JSON.parse(savedData);
  } catch (err) {
    console.error("Could not load data from localStorage", err);
    return undefined;
  }
};

// 2. Save data to localStorage every time something changes
const saveState = (state) => {
  try {
    const dataToSave = JSON.stringify(state);
    localStorage.setItem("todoAppData", dataToSave);
  } catch (err) {
    console.error("Could not save data to localStorage", err);
  }
};

// 3. Create the Redux store with preloaded data
const preloadedState = loadState();

const rootReducers = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

const store = createStore(rootReducers, preloadedState);

// 4. Save to localStorage every time the store changes
store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
    filter: store.getState().filter,
  });
});

export default store;
