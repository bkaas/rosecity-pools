import React from "react"
import Layout from "../components/Layout.js"
import Logo from "../../assets/logo.svg"
import * as styles from "../styles/homePage.module.css"

export default function Home() {

  return (
    <Layout>
      <h1 className={styles.title}>Rose City Pools</h1>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
    </Layout>
  );
}
