import React from "react"
import * as styles from "./navBar.module.css"
import { Link } from "gatsby"

export default function NavBar() {
  return (
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/draft/home">Draft</Link>
        <Link to="#">History</Link>
      </nav>
  );
}