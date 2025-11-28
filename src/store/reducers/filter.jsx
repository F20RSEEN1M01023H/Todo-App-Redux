import React from "react";
import { SET_FILTER } from "../actions/filter";
const initialState = "All";

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default:
      return state;
  }
};

export default filter;
