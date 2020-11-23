import React from "react";
import LayoutApp from "./components/LayoutApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = () => <h1>Home</h1>;
const Signup = () => <h1>Signup</h1>;
const Login = () => <h1>Login</h1>;
const Brief = () => <h1>Brief</h1>;
const Ledger = () => <h1>Ledger</h1>;
const Profile = () => <h1>Profile</h1>;

const router = () => (
  <Router>
    <LayoutApp>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Signup} path="/signup" exact />
        <Route component={Login} path="/login" exact />
        <Route component={Brief} path="/brief" exact />
        <Route component={Ledger} path="/ledger" exact />
        <Route component={Profile} path="/profile" exact />
      </Switch>
    </LayoutApp>
  </Router>
);

export default router;
