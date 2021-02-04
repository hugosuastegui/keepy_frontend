import React from "react";
import LayoutApp from "./components/LayoutApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";

const Profile = () => <h1>Profile</h1>;
const EditProject = () => <h1>Project Details</h1>;
const Brief = () => <h1>Brief</h1>;
const Ledger = () => <h1>Ledger</h1>;
const Subaccounts = () => <h1>Subaccounts</h1>;

const router = () => (
  <Router>
    <LayoutApp>
      <Switch>
        <Route component={Signup} path="/" exact />
        <Route component={Login} path="/login" exact />
        <Route component={Projects} path="/projects" exact />
        <Route component={NewProject} path="/projects/new" exact />
        <Route component={EditProject} path="/projects/:projectId" exact />
        <Route component={Brief} path="/brief/:projectId" exact />
        <Route component={Ledger} path="/ledger/:projectId" exact />
        <Route component={Subaccounts} path="/subaccounts/:projectId" exact />
        <Route component={Profile} path="/profile" exact />
      </Switch>
    </LayoutApp>
  </Router>
);

export default router;
