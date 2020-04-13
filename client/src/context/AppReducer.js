export default (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS':
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'ITEM_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
