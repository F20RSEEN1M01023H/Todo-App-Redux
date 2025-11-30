import { SET_FILTER } from "../actions/filter";

const initialState = "ALL";

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

export default filterReducer;
