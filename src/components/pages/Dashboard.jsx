import React from "react";
import styles from "../../styles/Dashboard.module.css";
import SideBarDash from "../commons/SideBarDash";
import DisplayPostsDash from "./DisplayPostsDash";

export default function Dashboard() {
  return (
    <main className={styles.containerDashboard}>
      <h1 className={styles.dashTitle}>Create from a photo</h1>
      <div className={styles.containerComponent}>
        <SideBarDash />
        <DisplayPostsDash />
      </div>
    </main>
  );
}
