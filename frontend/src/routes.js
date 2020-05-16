import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Dashboard from "./pages/dashboard";
import Header from "./components/Header";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Transaction from "./pages/transaction";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      {/* <Route exact path="/" component={Main} />
      <Route path="/products/:id" component={Product} /> */}
      "
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/transaction" component={Transaction} />
      <Route path="*" component={SignIn} /> {/* Página não encontrada */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
