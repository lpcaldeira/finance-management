import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { login } from "../../services/auth";

import {
  Form,
  Container,
  DivText,
  Section,
  Article,
  DivStructureImage,
} from "./styles";

import {
  signInUserActions,
  getTransactionsActions,
  getProductsActions,
} from "../../actions";
import { getTransactionsProviders } from "../transaction/providers";
import { getProductsProviders } from "../product/providers";
import { signInUserProviders } from "./providers";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleTransactions = async () => {
    const response = await getTransactionsProviders();
    if (response.result === false) {
      this.setState({
        error: response.message,
      });
    } else {
      return this.props.getTransactionsActions(response.docs);
    }
  };

  handleProducts = async () => {
    const response = await getProductsProviders();
    if (response.result === false) {
      this.setState({
        error: response.message,
      });
    } else {
      return this.props.getProductsActions(response.docs);
    }
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    await this.props.signInUserActions({});
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await signInUserProviders(email, password);
        if (response.result === true) {
          login(response.token);
          await this.handleProducts();
          await this.handleTransactions();
          this.props.history.push("/dashboard");
        } else {
          this.setState({ error: response.message });
        }
      } catch (err) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais.",
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Section>
          <Form onSubmit={this.handleSignIn}>
            <h1>Fazer login</h1>
            {this.state.error && <p>{this.state.error}</p>}
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
            <button type="submit">Entrar</button>
            <hr />
            <Link to="/signup">Criar conta grátis</Link>
          </Form>
          <Article>
            <DivStructureImage>
              <div>
                <div>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="workstation.webp"
                    />
                    <img
                      alt="Estações de trabalho"
                      title=""
                      src="workstation.jpg"
                      type="image/jpg"
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
            </DivStructureImage>
            <DivText>
              <h3>Diferentes!</h3>
              <p>
                <span>
                  Somos uma empresa que desenvolve soluções simples, seguras e
                  100% digitais para sua vida financeira. Hoje, somos o mais
                  reconhecido sistema financeiro para MEI, micro e pequenas
                  empresas no Brasil e contamos com mais de 20 mil de clientes.
                </span>
              </p>
              <pre>
                <strong>- burocracia</strong>
              </pre>
              <pre>
                <strong>- papelada</strong>
              </pre>
              <pre>
                <strong>+ agilidade</strong>
              </pre>
              <pre>
                <strong>+ segurança</strong>
              </pre>
            </DivText>
          </Article>
        </Section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signInUserActions,
      getTransactionsActions,
      getProductsActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
