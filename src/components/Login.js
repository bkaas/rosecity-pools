// Ref: https://www.gatsbyjs.com/tutorial/authentication-tutorial/

import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

import * as styles from "../styles/login.module.css"

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
    };

    this.route = "/draft/home";

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    console.log("Login component render.")

    if (isLoggedIn()) {
      navigate(this.route)
    }

    return (
      <>
        <form
          className={styles.loginForm}
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(this.route)
          }}
        >
          <label for="password">Enter draft password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleUpdate}
          />
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}