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
  // TableTransactionsTitle,
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

// import MaterialTable, { MTableBodyRow } from "material-table";

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
      columns: [],
      data: [],
      openModalDelete: false,
      openModalUpdate: false,
    };
  }

  async componentDidMount() {
    await this.loadTransactions();
  }

  handleOpenModalDelete = () => {
    this.setState({ openModalDelete: true });
  };

  handleCloseModalDelete = () => {
    this.setState({ openModalDelete: false });
  };

  handleOpenModalUpdate = () => {
    this.setState({ openModalUpdate: true });
  };

  handleCloseModalUpdate = () => {
    this.setState({ openModalUpdate: false });
  };

  handleButtonUpdate = async (transaction) => {
    console.log(transaction);
    return false;
    const response = await updateTransactionProviders(this.state);
    await this.props.dispatch(
      updateTransactionActions(response.TransactionObject)
    );
  };

  handleButtonDelete = async (transaction) => {
    console.log(transaction);
    await deleteTransactionProviders(transaction._id);
    await this.props.deleteTransactionActions(transaction);
    const { transactions } = this.props.transactionReducer || [];
    await this.props.getTransactionsActions(transactions);
    this.loadTransactions();
  };

  async loadTransactions() {
    const { transactions } = this.props.transactionReducer || [];
    const { products } = this.props.productReducer || [];
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
        productTitle: transaction.product
          ? transaction.product.title
          : "Produto não encontrado",
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

    console.log(products);

    const columns = [
      { title: "Tipo", field: "type", lookup: { 0: "Compra", 1: "Venda" } },
      { title: "Data", field: "formattedDate" },
      {
        title: "Produto",
        field: "productTitle",
        // lookup: Object.assign({}, ...products.map((x) => ({[x._id]: x.title})))
        // render: rowData => Object.assign({}, ...rowData.map((x) => ({[x._id]: x.title})))
      },
      { title: "Quantidade", field: "quantity", type: "numeric" },
      { title: "Preço de compra", field: "purchasePrice", type: "numeric" },
      { title: "Preço de venda", field: "salePrice", type: "numeric" },
      { title: "Preço da transação", field: "price", type: "numeric" },
    ];

    this.setState({
      columns,
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

        {/* <MaterialTable
          title={<TableTransactionsTitle>Transações</TableTransactionsTitle>}
          columns={this.state.columns}
          data={this.state.transactions}
          options={{
            toolbar: true, // remove o search, titulo, opção de exportação, etc
            actionsColumnIndex: -1, // põe os botões de ação na última coluna
            pageSizeOptions: [5, 10, 25, 50, 100],
            exportFileName: "TabelaGestaoFinanceira",
            exportDelimiter: ";",
            exportButton: true,
            exportAllData: true,
            headerStyle: {
              backgroundColor: "#333",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#f2f2f2",
              },
            },
            rowStyle: {
              // "&:nthChild(even)": {
              backgroundColor: "#f2f2f2",
              // },
              "&:hover": {
                backgroundColor: "#333",
              },
            },
          }}
          // components={{
          //   Row: props => {
          //     const propsCopy = { ...props };
          //     console.log(propsCopy)
          //     // propsCopy.actions.find(a => a.name === 'remove').disabled = propsCopy.data.id < 100;
          //     // propsCopy.actions.find(a => a.name === 'account').disabled = propsCopy.data.name !== 'Paper';
          //     propsCopy.columns.find(x => x.)
          //     return <MTableBodyRow {...propsCopy} />
          //   }
          // }}
          // components={{
          //   Action: props => (
          //     <Button
          //       onClick={(event) => props.action.onClick(event, props.data)}
          //       color="primary"
          //       variant="contained"
          //       style={{textTransform: 'none'}}
          //       size="small"
          //     >
          //       My Button
          //     </Button>
          //   ),
          // }}
          localization={{
            body: {
              emptyDataSourceMessage:
                "Nenhuma compra/venda feita ainda neste período.",
              editRow: {
                deleteText: "Deseja realmente excluir esta transação?",
                cancelTooltip: "Cancelar",
                saveTooltip: "Salvar"
              },
            },
            pagination:{
              labelRowsSelect: "linhas",
              labelRowsPerPage: "Linhas por página:"
            }
          }}
          actions={[
            {
              icon: "save",
              tooltip: "Salvar esta transação",
              onClick: (event, rowData) => alert("salvar " + rowData.type),
            },
            {
              icon: "edit",
              tooltip: "Alterar esta transação",
              onClick: (event, rowData) => alert("alterar " + rowData.type),
            },
            (rowData) => ({
              icon: "delete",
              tooltip: "Excluir esta transação",
              onClick: (event, rowData) => alert("deletar " + rowData.type),
              disabled: rowData.birthYear < 2000,
            }),
          ]}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  // setState((prevState) => {
                  //   const data = [...prevState.data];
                  //   data.push(newData);
                  //   return { ...prevState, data };
                  // });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  // if (oldData) {
                  //   setState((prevState) => {
                  //     const data = [...prevState.data];
                  //     data[data.indexOf(oldData)] = newData;
                  //     return { ...prevState, data };
                  //   });
                  // }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  // setState((prevState) => {
                  //   const data = [...prevState.data];
                  //   data.splice(data.indexOf(oldData), 1);
                  //   return { ...prevState, data };
                  // });
                }, 600);
              }),
          }}
        /> */}

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
                <th>Ações</th>
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
                        onClick={this.handleOpenModalUpdate}
                      >
                        <EditIconRounded style={MuiStyles.buttonUpdate} />
                      </IconButton>

                      <Dialog
                        open={this.state.openModalUpdate}
                        onClose={this.handleCloseModalUpdate}
                      >
                        <DialogTitle>
                          Atualizar transação
                        </DialogTitle>
                        <DialogContent>
                          {/* <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                          /> */}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleCloseModalUpdate} color="primary">
                            Salvar
                          </Button>
                          <Button onClick={this.handleCloseModalUpdate} color="primary">
                            Cancelar
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <IconButton
                        aria-label="delete"
                        title="Excluir esta transação"
                        onClick={this.handleOpenModalDelete}
                      >
                        <DeleteIconRounded style={MuiStyles.buttonDelete} />
                      </IconButton>

                      <Dialog
                        open={this.state.openModalDelete}
                        onClose={this.handleCloseModalDelete}
                        maxWidth="xs"
                      >
                        <DialogTitle>Excluir a transação</DialogTitle>
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
                            onClick={this.handleCloseModalDelete}
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
              style={MuiStyles.buttonFab}
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
