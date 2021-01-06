import React from "react";
import LayoutApp from "./components/LayoutApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Aquí va el Landing Page y el Signup
// const Signup = () => <h1>Signup</h1>;
// Aquí va solo el Welcome Back y el form del login
// const Login = () => <h1>Login</h1>;
// Aquí va el display de todos los projectos que tiene el ususario
const Projects = () => <h1>Projects</h1>;
// Aquí va todo el análisis de datos del proyecto
const Brief = () => <h1>Brief</h1>;
// Aquí se va a editar el proyacto y se van a agregar subaccounts, Project CRUD / Subaccount CRUD
const Project = () => <h1>Edit Project</h1>;
// Aquí va el Concept CRUD
const Ledger = () => <h1>Ledger</h1>;
// Aquí va el User CRUD
const Profile = () => <h1>Profile</h1>;

const router = () => (
  <Router>
    <LayoutApp>
      <Switch>
        <Route component={Signup} path="/signup" exact />
        <Route component={Login} path="/login" exact />
        <Route component={Projects} path="/projects" exact />
        <Route component={Brief} path="/brief" exact />
        <Route component={Project} path="/project" exact />
        <Route component={Ledger} path="/ledger" exact />
        <Route component={Profile} path="/profile" exact />
      </Switch>
    </LayoutApp>
  </Router>
);

export default router;
