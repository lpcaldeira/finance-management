import React from "react";

import { withRouter } from "react-router-dom";

import { Container } from "./styles";

const Header = () => {
  return (
    <Container>
      <header>
        {/* <Link to="/dashboard">
          <img
            src="https://upload.wikimedia.org/wikipedia/pt/0/08/Logo_nubank.png"
            alt="Gestão Financeira"
          />
        </Link> */}
        <strong>Seu Logo Aqui</strong>
      </header>
    </Container>
  );
};

export default withRouter(Header);
