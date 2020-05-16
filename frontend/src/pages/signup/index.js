import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form, Container } from "./styles";

import { signUpUserProviders } from "../signin/providers";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = this.state;
    if (!firstname || !lastname || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        const response = await signUpUserProviders(this.state);
        console.log(response)
        if (response.result === false) {
          this.setState({
            error: response.message,
          });
        } else {
          this.props.history.push("/signin");
        }
      } catch (err) {
        console.log(err.message);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <h1>Cadastrar grátis</h1>
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/pt/0/08/Logo_nubank.png"
            alt="Gestão Financeira"
          /> */}
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => this.setState({ firstname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sobrenome"
            onChange={(e) => this.setState({ lastname: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Enviar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
