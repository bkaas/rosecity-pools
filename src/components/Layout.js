import React from "react"

import NavBar from "./NavBar.js"
import "../styles/layout.module.css"

export default function Layout(props) {
  return (
    <>
      <NavBar/>
      {props.children}
    </>
  );
}