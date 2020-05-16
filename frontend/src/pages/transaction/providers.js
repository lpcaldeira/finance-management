import api from "../../services/api";

const getTransactionsProviders = async () => {
  return await api
    .get(
      "/transactions",
      {},
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch(
      (err) => ({
        result: false,
        message:
          "Não foi possível registrar esta Transação. Verifique as informações digitadas.",
      })
    );
};

const addTransactionProviders = async (obj) => {
  const { quantity, price, purchasePrice, salePrice, product, type } = obj;
  return await api
    .post(
      "/transactions",
      {
        quantity: parseFloat(quantity),
        price,
        purchasePrice,
        salePrice,
        product,
        type,
      },
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return {
        result: false,
        message:
          "Ocorreu um problema ao registrar esta Transação. Verifique as informações digitadas.",
      };
    });
};

const deleteTransactionProviders = async (id) => {
  return await api
    .delete(
      "/transactions/" + id,
      {},
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch(
      (err) => ({
        result: false,
        message:
          "Não foi possível excluir esta Transação.",
      })
    );
};

const updateTransactionProviders = async (obj) => {
  const { quantity, price, purchasePrice, salePrice, product, type } = obj;
  return await api
    .post(
      "/transactions",
      {
        quantity: parseFloat(quantity),
        price,
        purchasePrice,
        salePrice,
        product,
        type,
      },
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return {
        result: false,
        message:
          "Ocorreu um problema ao registrar esta Transação. Verifique as informações digitadas.",
      };
    });
};

export { getTransactionsProviders, addTransactionProviders, deleteTransactionProviders, updateTransactionProviders };
