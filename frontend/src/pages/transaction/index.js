import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import api from "../../services/api";

import { addTransactionActions, getTransactionsActions } from "../../actions";
import { addTransactionProviders } from "./providers";

import { Form, Container, MuiStyles } from "./styles";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import Select from "../../components/Select";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import Autocomplete from "../../components/Autocomplete"
// import CurrencyInput from "react-currency-input";
import CurrencyInput from "../../components/Currency"

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.salePriceRef = React.createRef();
    this.purchasePriceRef = React.createRef();
    this.state = {
      quantity: 1,
      price: 0,
      purchasePrice: 0,
      salePrice: 0,
      product: "",
      type: 0,
      realPrice: 0,
      products: [],
      error: "",
    };
  }

  async componentDidMount() {
    await this.loadProducts();
  }

  async loadProducts() {
    const response = await api.get("/products");
    const productsFormatted = response.data.docs;
    this.setState({
      products: productsFormatted,
    });
  }

  handleTypeChange = async (e) => {
    console.log(e.target.value)
    let { realPrice, purchasePrice, salePrice, quantity } = this.state;
    if (e.target.value === 0) realPrice = purchasePrice;
    else realPrice = salePrice;
    this.setState({
      realPrice,
      type: e.target.value,
      price: realPrice * quantity,
    });
  };

  handleProductChange = async (event, newValue) => {
    const { type, quantity, products } = this.state;

    const productSelected = products.filter((product) => {
      if (product.title === newValue) return product;
    })[0];

    if (productSelected) {
      // Se a transação for de Compra, então usa o Price, caso contrário, o salePrice
      const realPrice =
        type === 0 ? productSelected.price : productSelected.salePrice;
      this.setState({
        realPrice,
        salePrice: productSelected.salePrice,
        purchasePrice: productSelected.price,
        price: realPrice * quantity,
        product: productSelected._id,
      });
    }
  };

  handleSalePriceChange = async (e, maskedValue, floatValue) => {
    let { type, realPrice, quantity, purchasePrice } = this.state;
    if (type === 0) realPrice = purchasePrice;
    else realPrice = floatValue;
    this.setState({
      realPrice,
      salePrice: floatValue,
      price: realPrice * quantity,
    });
  };

  handlePurchasePriceChange = async (e, maskedValue, floatValue) => {
    let { type, realPrice, quantity, salePrice } = this.state;
    if (type === 1) realPrice = salePrice;
    else realPrice = floatValue;
    this.setState({
      realPrice,
      purchasePrice: floatValue,
      price: realPrice * quantity,
    });
  };

  handleQuantityChange = async (e) => {
    this.setState({
      quantity: e.target.value,
      price: this.state.realPrice * e.target.value,
    });
  };

  handleTransaction = async (e) => {
    e.preventDefault();

    let { quantity, price, purchasePrice, salePrice, product } = this.state;
    // salePrice = this.salePriceRef.current.state.value;
    // purchasePrice = this.purchasePriceRef.current.state.value;
    if (!price || !purchasePrice || !salePrice || !quantity || !product) {
      this.setState({ error: "Preencha todos os campos para continuar!" });
    } else {
      const response = await addTransactionProviders(this.state);
      if (response.result === true) {
        await this.props.dispatch(
          addTransactionActions(response.TransactionObject)
        );
        this.props.history.push("/dashboard");
      } else {
        this.setState({ error: response.message });
      }
    }
  };

  render() {
    const menuItems = [
      {
        value: 0,
        label: "Compra",
      },
      {
        value: 1,
        label: "Venda",
      },
    ];
    return (
      <Container>
        <Form autoComplete="off" onSubmit={this.handleTransaction}>
          <h1>Registrar transação</h1>
          {this.state.error && <p>{this.state.error}</p>}

          <InputLabel style={MuiStyles.inputLabel}>Tipo</InputLabel>
          <Select
            variant="outlined"
            value={this.state.type}
            onChange={this.handleTypeChange}
            label="Tipo"
            defaultValue="0"
            style={MuiStyles.select}
            menuItems={menuItems}
          />

          {this.state.products.length > 0 ? (
            <Autocomplete
              onInputChange={this.handleProductChange}
              freeSolo
              disableClearable
              blurOnSelect
              fullWidth
              style={{ width: "100%" }}
              options={this.state.products}
              getOptionLabel={(product) => product.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Produto"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          ) : null}

          <InputLabel style={MuiStyles.inputLabel}>
            Quantidade de produtos
          </InputLabel>
          <CurrencyInput
            key="CurrencyInputQuantity"
            style={MuiStyles.currencyInput}
            value={this.state.quantity}
            onChangeEvent={this.handleQuantityChange}
            decimalSeparator=","
            thousandSeparator="."
            precision="0"
          />

          <InputLabel style={MuiStyles.inputLabel}>Preço de venda</InputLabel>
          <CurrencyInput
            key="CurrencyInputSalePrice"
            disabled={this.state.type === 1 ? false : true}
            ref={this.salePriceRef}
            style={MuiStyles.currencyInput}
            value={this.state.salePrice}
            // onChangeEvent={(e) => this.setState({ salePrice: e.target.value })}
            onChangeEvent={this.handleSalePriceChange}
            decimalSeparator=","
            thousandSeparator="."
            precision="2"
            prefix="R$ "
          />

          <InputLabel style={MuiStyles.inputLabel}>Preço de compra</InputLabel>
          <CurrencyInput
            key="CurrencyInputPurchasePrice"
            disabled={this.state.type === 0 ? false : true}
            ref={this.purchasePriceRef}
            style={MuiStyles.currencyInput}
            value={this.state.purchasePrice}
            // onChangeEvent={(e) =>
            //   this.setState({ purchasePrice: e.target.value })
            // }
            onChangeEvent={this.handlePurchasePriceChange}
            decimalSeparator=","
            thousandSeparator="."
            precision="2"
            prefix="R$ "
          />

          <InputLabel style={MuiStyles.inputLabel}>Preço Total</InputLabel>
          <CurrencyInput
            disabled
            key="CurrencyInputPrice"
            style={MuiStyles.currencyInput}
            value={this.state.price}
            onChangeEvent={(e) => this.setState({ price: e.target.value })}
            decimalSeparator=","
            thousandSeparator="."
            precision="2"
            prefix="R$ "
          />

          <button type="submit">Criar</button>
          <hr />
          <Link to="/dashboard">Voltar</Link>
        </Form>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      addTransactionActions,
      getTransactionsActions,
      dispatch
    ),
  };
}
export default connect(mapDispatchToProps)(withRouter(Transaction));
