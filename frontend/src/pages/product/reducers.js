import * as actionType from "../../actions/actionsTypes";
import getDiff from "../../utils/diff";

const productReducer = (state = {}, action) => {
  let index = -1;
  switch (action.type) {
    case actionType.GET_PRODUCTS:
      return { ...state, [action.name]: action.value };

    case actionType.ADD_PRODUCT:
      state = { ...state };
      state.products.push(action.value);
      return { ...state };

    case actionType.DELETE_PRODUCT:
      state = { ...state };
      index = state.products.findIndex(
        (x) => x._id === action.value._id
      );
      if (index !== -1) state.products.splice(index, 1);
      return { ...state };

    case actionType.UPDATE_PRODUCT:
      state = { ...state };
      index = state.products.findIndex(
        (x) => x._id === action.value._id
      );
      if (index !== -1){
        const updatedKeys = getDiff(action.value, state.products[index])
        console.log(updatedKeys)
        // state.products.splice(index, 1);
      }
      return { ...state };

    default:
      return state;
  }
};

export default productReducer;
