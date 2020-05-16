import api from "../../services/api";

const getProductsProviders = async () => {
  return await api
    .get(
      "/products",
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
          "Não foi possível buscar os Produtos. Tente novamente.",
      })
    );
};

const addProductProviders = async (obj) => {
  const { quantity, price, purchasePrice, salePrice, product, type } = obj;
  return await api
    .post(
      "/products",
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
          "Ocorreu um problema ao registrar este Produto. Verifique as informações digitadas.",
      };
    });
};

const deleteProductProviders = async (id) => {
  return await api
    .delete(
      "/products/" + id,
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
          "Não foi possível excluir este Produto.",
      })
    );
};

const updateProductProviders = async (obj) => {
  const { quantity, price, purchasePrice, salePrice, product, type } = obj;
  return await api
    .post(
      "/products",
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
          "Ocorreu um problema ao registrar este Produto. Verifique as informações digitadas.",
      };
    });
};

export { getProductsProviders, addProductProviders, deleteProductProviders, updateProductProviders };
