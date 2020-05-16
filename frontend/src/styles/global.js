import { createGlobalStyle } from "styled-components";
import Colors from "./colors"

import "font-awesome/css/font-awesome.css";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Roboto";
  font-weight: normal;
  src: local("Roboto"), url('https://fonts.google.com/...') format("truetype");
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}
body, html {
  background: #eee;
  background-color: ${Colors.backgroundPadrao};
  font-family: "Roboto", sans-serif;
  /* font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', Arial, sans-serif; */
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  height: 100%;
  width: 100%;
  font-size: 12px;
  color: black;
}

h1 {
  font-size: 25px;
  color: ${Colors.backgroundPadrao};
}

table {
  background-color: #ffffff;
  border-radius: 5px;
}

form {
  background-color: #ffffff;
  border-radius: 5px;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
}

input {
  border-radius: 5px;
}
`;
