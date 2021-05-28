import React from "react";
// import LayoutApp from "./components/LayoutApp";
import DashboardLayout from "./components/DashboardLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Landing from "./pages/Landing";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import Ledger from "./pages/Ledger";
import Subaccounts from "./pages/Subaccounts";
import Brief from "./pages/Brief";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import KPIs from "./pages/KPIs";

const queryClient = new QueryClient();

const router = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route component={Landing} path="/" exact />
        <DashboardLayout>
          <Route component={Projects} path="/projects" exact />
          <Route component={NewProject} path="/projects/new" exact />
          <Route component={EditProject} path="/projects/:projectId" exact />
          <Route component={Brief} path="/brief" exact />
          <Route component={Ledger} path="/ledger" exact />
          <Route component={Subaccounts} path="/subaccounts" exact />
          <Route component={Profile} path="/profile" exact />
          <Route component={KPIs} path="/kpis" exact />
          <Route component={Budget} path="/budget" exact />
        </DashboardLayout>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default router;
