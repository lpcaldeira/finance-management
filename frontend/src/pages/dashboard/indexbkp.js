import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Float,
  Container,
  CardContainer,
  Card,
  TableContainer,
  MuiStyles,
} from "./styles";

import formatValue from "../../utils/formatValue";
import Colors from "../../styles/colors";

import Fab from "@material-ui/core/Fab";
import AddIconRounded from "@material-ui/icons/AddRounded";
import RemoveIconRounded from "@material-ui/icons/RemoveRounded";
import MoneyOffIconRounded from "@material-ui/icons/MoneyOffRounded";
import AttachMoneyIconRounded from "@material-ui/icons/AttachMoneyRounded";
import DeleteIconRounded from "@material-ui/icons/DeleteRounded";
import EditIconRounded from "@material-ui/icons/EditRounded";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  getTransactionsActions,
  addTransactionActions,
  deleteTransactionActions,
  updateTransactionActions,
} from "../../actions";
import {
  deleteTransactionProviders,
  updateTransactionProviders,
} from "../transaction/providers";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      open: false,
    };
  }

  async componentDidMount() {
    await this.loadTransactions();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleButtonUpdate = async (transaction) => {
    console.log(transaction);
    return false;
    const response = await updateTransactionProviders(this.state);
    await this.props.dispatch(
      updateTransactionActions(response.TransactionObject)
    );
    // this.props.history.push("/dashboard");
  };

  handleButtonDelete = async (transaction) => {
    console.log(transaction);
    console.log(this.props);
    await deleteTransactionProviders(transaction._id);
    await this.props.deleteTransactionActions(transaction);
    const { transactions } = this.props.transactionReducer || [];
    await this.props.getTransactionsActions(transactions);
    this.loadTransactions();
  };

  async loadTransactions() {
    const { transactions } = this.props.transactionReducer || [];
    let vendas = 0,
      compras = 0,
      impostos = 0,
      lucro = 0;

    const transactionsFormatted = transactions.map((transaction) => {
      // 0 - saida | 1 - entrada
      if (transaction.type === 0)
        compras += transaction.purchasePrice * transaction.quantity;
      else vendas += transaction.salePrice * transaction.quantity;
      return {
        ...transaction,
        purchasePriceFormatted: formatValue(transaction.purchasePrice),
        salePriceFormatted: formatValue(transaction.salePrice),
        priceFormatted: formatValue(transaction.price),
        formattedDate: new Date(transaction.createdAt).toLocaleDateString(
          "pt-br"
        ),
      };
    });

    // A cada 100 reais, ele paga 18,5% em impostos
    if (compras > 100) {
      const quotient = Math.floor(compras / 100);
      impostos = quotient * 0.185 * 100;
    }
    // 6% mensais por ser MEI
    impostos = vendas * 0.06;
    lucro = vendas - (compras + impostos);

    const balanceFormatted = {
      vendas: vendas,
      compras: compras,
      impostos: impostos,
      lucro: lucro,
    };

    this.setState({
      transactions: transactionsFormatted,
      balance: balanceFormatted,
    });
  }

  render() {
    const { transactions, balance } = this.state;
    return (
      <Container>
        {balance ? (
          <CardContainer>
            <Card>
              <header>
                <p>Quanto vendi</p>
                <AddIconRounded
                  style={{ fontSize: 30, color: Colors.vendas }}
                />
              </header>
              <h1 data-testid="balance-income" style={{ color: Colors.vendas }}>
                {formatValue(balance.vendas)}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Quanto gastei em produtos</p>
                <RemoveIconRounded
                  style={{ fontSize: 30, color: Colors.compras }}
                />
              </header>
              <h1
                data-testid="balance-outcome"
                style={{ color: Colors.compras }}
              >
                {formatValue(balance.compras)}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Quanto gastei em impostos</p>
                <MoneyOffIconRounded
                  style={{ fontSize: 30, color: Colors.compras }}
                />
              </header>
              <h1
                data-testid="balance-outcome"
                style={{ color: Colors.compras }}
              >
                {formatValue(balance.impostos)}
              </h1>
            </Card>
            <Card>
              <header>
                <p>Quanto lucrei este mês</p>
                <AttachMoneyIconRounded
                  style={{
                    fontSize: 30,
                    color: balance.lucro >= 0 ? Colors.vendas : Colors.compras,
                  }}
                />
              </header>
              <h1
                data-testid="balance-lucro"
                style={{
                  color: balance.lucro >= 0 ? Colors.vendas : Colors.compras,
                }}
              >
                {formatValue(balance.lucro)}
              </h1>
            </Card>
          </CardContainer>
        ) : (
          ""
        )}

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Data</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço de compra</th>
                <th>Preço de venda</th>
                <th>Preço da transação</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td
                      style={{
                        borderLeft:
                          "5px solid " +
                          (transaction.type === 0
                            ? Colors.comprasBordas
                            : Colors.vendasBordas),
                      }}
                    >
                      {transaction.type === 0 ? "Compra" : "Venda"}
                    </td>
                    <td>{transaction.formattedDate}</td>
                    <td>
                      {transaction.product ? transaction.product.title : "---"}
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.purchasePriceFormatted}</td>
                    <td>{transaction.salePriceFormatted}</td>
                    <td>{transaction.priceFormatted}</td>
                    <td>
                      <IconButton
                        aria-label="update"
                        title="Alterar esta transação"
                        onClick={() => this.handleButtonUpdate(transaction)}
                      >
                        <EditIconRounded style={MuiStyles.buttonUpdate} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        title="Excluir esta transação"
                        onClick={this.handleClickOpen}
                      >
                        <DeleteIconRounded style={MuiStyles.buttonDelete} />
                      </IconButton>
                      <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        // keepMounted  // se deixar isso, a modal fica na tela até vc remover todos itens da lista
                        maxWidth="xs"
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          Excluir a transação
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText style={{ fontSize: "16px" }}>
                            Deseja realmente excluir esta transação?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            autoFocus
                            onClick={() => this.handleButtonDelete(transaction)}
                            color="primary"
                            style={{ fontSize: "14px" }}
                          >
                            Sim
                          </Button>
                          <Button
                            autoFocus
                            onClick={this.handleClose}
                            color="primary"
                            style={{ fontSize: "14px" }}
                          >
                            Não
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty">
                    Nenhuma compra/venda feita ainda neste período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableContainer>

        <Container
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Float>
            <Fab
              position="right-bottom"
              slot="fixed"
              href="/transaction"
              aria-label="add"
              title="Fazer compra/venda"
              style={{
                backgroundColor: Colors.backgroundPadrao,
                color: "#fff",
              }}
            >
              <AddIconRounded style={{ fontSize: 30 }} />
            </Fab>
          </Float>
        </Container>
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
      getTransactionsActions,
      addTransactionActions,
      deleteTransactionActions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
