import React from "react"

import NavBar from "./NavBar.js"
import * as styles from "../styles/layout.module.css"

export default function Layout(props) {
  return (
    <>
      <NavBar/>
      {props.children}
    </>
  );
}