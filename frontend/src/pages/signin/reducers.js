import * as actionType from "../../actions/actionsTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.SIGNIN_USER:
      // state = undefined;
      return state;
    default:
      return state;
  }
};

export default userReducer;
