// Ref: https://www.gatsbyjs.com/tutorial/authentication-tutorial/

import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export default function PrivateRoute({ component: Component, location, ...rest }) {
  if (!isLoggedIn() && location.pathname !== `/draft/login`) {
    navigate("/draft/login")
    return null
  }

  return <Component {...rest} />
}