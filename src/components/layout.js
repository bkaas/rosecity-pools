import React from "react"

import * as styles from "./layout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.fontWrapper}>
      {children}
    </div>
  );
}