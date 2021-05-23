import React from "react"
import Layout from "../components/Layout.js"
import DraftMain from "../components/Draftmain.js"
import Login from "../components/Login.js"
import { isLoggedIn } from "../services/auth"

export default class Draft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: isLoggedIn(),
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState( state => {
      if (state.isLoggedIn === isLoggedIn())
        return null; // Don't render if the login state didn't change
      else {
        return { isLoggedIn: isLoggedIn() };
      }
    });
  }


  render() {

    let componentToRender
    if (this.state.isLoggedIn) {
      componentToRender = <DraftMain />;
    }
    else {
      componentToRender = <Login handleLogin={this.handleLogin} />;
    }

    return (
      <Layout>
        {componentToRender}
      </Layout>
    );
  }

}
