import * as actionTypes from './actionsTypes';

// USER
export const signInUserActions = () => {
  return{
    type: actionTypes.SIGNIN_USER,
    name: "signin"
  }
};

// TRANSACTION
export const addTransactionActions = transaction => {
  return{
    type: actionTypes.ADD_TRANSACTION,
    name: "transaction",
    value: transaction
  }
};
export const deleteTransactionActions = transaction => {
  return{
    type: actionTypes.DELETE_TRANSACTION,
    name: "transaction",
    value: transaction
  }
};
export const updateTransactionActions = transaction => {
  return{
    type: actionTypes.UPDATE_TRANSACTION,
    name: "transaction",
    value: transaction
  }
};
export const getTransactionsActions = transactions => {
  return{
    type: actionTypes.GET_TRANSACTIONS,
    name: "transactions",
    value: transactions
  }
};

// PRODUCT
export const addProductActions = product => {
  return{
    type: actionTypes.ADD_PRODUCT,
    name: "product",
    value: product
  }
};
export const deleteProductActions = product => {
  return{
    type: actionTypes.DELETE_PRODUCT,
    name: "product",
    value: product
  }
};
export const updateProductActions = product => {
  return{
    type: actionTypes.UPDATE_PRODUCT,
    name: "product",
    value: product
  }
};
export const getProductsActions = products => {
  return{
    type: actionTypes.GET_PRODUCTS,
    name: "products",
    value: products
  }
};