import api from "../../services/api";

const signInUserProviders = async (email, password) => {
  return await api
    .post(
      "/users/signin",
      { email, password },
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => ({
      result: false,
      message:
        "Houve um problema com as informações digitadas. Corrija e tente novamente.",
    }));
};

const signUpUserProviders = async (obj) => {
  const { firstname, lastname, email, password } = obj;
  return await api
    .post(
      "/users/signup",
      { firstname, lastname, email, password },
      {
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => ({
      result: false,
      message:
        "Ocorreu um erro ao registrar sua conta. Verifique as informações digitadas.",
    }));
};

export { signInUserProviders, signUpUserProviders };
