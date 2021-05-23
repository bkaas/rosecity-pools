import React from "react"
import * as styles from "../styles/navBar.module.css"
import { Link } from "gatsby"

export default function NavBar() {
  return (
      <nav className={styles.navbar}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/draft">Draft</Link></li>
          {/*<li><Link to="#">History</Link></li>*/}
        </ul>
      </nav>
  );
}