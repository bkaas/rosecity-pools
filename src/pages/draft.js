import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout.js"
import DraftMain from "../components/Draftmain.js"
import Login from "../components/Login.js"
import PrivateRoute from "../components/PrivateRoute.js"

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
