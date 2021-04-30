import React from "react"
import * as styles from "./navBar.module.css"
import { Link } from "gatsby"

import Layout from "./layout.js"

export default function NavBar() {
  return (
    <Layout>
      <nav className={styles.navbar}>
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="#">Draft</Link>
        <Link to="#">History</Link>
      </nav>
    </Layout>
  );
}