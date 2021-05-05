import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout.js"
import DraftMain from "../components/draftmain.js"
import Login from "../components/login.js"
import PrivateRoute from "../components/PrivateRoute"

export default function Draft() {

  return (
    <Layout>
      <Router>
        <PrivateRoute path="/draft/home" component={DraftMain} />
        <Login path="/draft/login" />
      </Router>
    </Layout>
  );

}
