import * as actionType from "../../actions/actionsTypes";
import getDiff from "../../utils/diff";

const transactionReducer = (state = {}, action) => {
  let index = -1;
  switch (action.type) {
    case actionType.GET_TRANSACTIONS:
      return { ...state, [action.name]: action.value };

    case actionType.ADD_TRANSACTION:
      state = { ...state };
      state.transactions.push(action.value);
      return { ...state };

    case actionType.DELETE_TRANSACTION:
      state = { ...state };
      index = state.transactions.findIndex(
        (x) => x._id === action.value._id
      );
      if (index !== -1) state.transactions.splice(index, 1);
      return { ...state };

    case actionType.UPDATE_TRANSACTION:
      state = { ...state };
      index = state.transactions.findIndex(
        (x) => x._id === action.value._id
      );
      if (index !== -1){
        const updatedKeys = getDiff(action.value, state.transactions[index])
        console.log(updatedKeys)
        // state.transactions.splice(index, 1);
      }
      return { ...state };

    default:
      return state;
  }
};

export default transactionReducer;
