import { PROFILES_LOADED, PROFILES_ERROR, ADD_CUSTOMER, ADD_CUSTOMER_ERROR } from "../actions/types";
import { HISTORY_LOADED, HISTORY_ERROR, TRANSFER_SUCCESS, TRANSFER_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  profiles: [],
  error: {},
  history: [],
  temp:null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILES_LOADED:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        loading: false,
        profiles: [...state.profiles, payload],
      };
    case PROFILES_ERROR:
    case ADD_CUSTOMER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case HISTORY_LOADED:
      return {
        ...state,
        loading: false,
        history: payload,
      };
    case HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    
    case TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        temp: payload,
      };
    case TRANSFER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
