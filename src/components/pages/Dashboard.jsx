import React from "react";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.containerDashboard}>
      <h1 className={styles.dashTitle}>Create from a photo</h1>

      <div className={styles.createPostBtn}>
        <Link href="/createPost">
          <button>Create a post</button>
        </Link>
      </div>
    </main>
  );
}
