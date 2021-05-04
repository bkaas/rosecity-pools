import React from "react"

import NavBar from "./navBar.js"

export default function Layout(props) {
  return (
    <>
      <NavBar/>
      {props.children}
    </>
  );
}