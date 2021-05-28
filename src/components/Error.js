// Error.js

import React from "react"
import * as styles from "../styles/error.module.css"

export default function Error(props) {

  return (

    <div className={styles.error}>
      {props.children}
    </div>

  );

}