// Isso deve ser melhorado posteriormente
// export const JWT_KEY = "leo-finance-management-nodejs-mongodb-2020";
export const isAuthenticated = async () => await localStorage.getItem("JWT_KEY") !== null;
export const getToken = async () => await localStorage.getItem("JWT_KEY");
export const login = async token => {
  await localStorage.setItem("JWT_KEY", token);
};
export const logout = async () => {
  await localStorage.removeItem("JWT_KEY");
};