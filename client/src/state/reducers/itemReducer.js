import {
  GET_ITEMS,
  CLEAR_ITEMS,
  DELETE_ITEM,
  UPDATE_ITEM,
  ADD_ITEM,
  ITEMS_ERROR,
} from '../actions/types';

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ITEMS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
