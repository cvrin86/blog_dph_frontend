import React from "react";
import Link from "next/link";
import styles from "../../styles/SideBarDash.module.css";

export default function SideBarDash() {
  return (
    <section className={styles.sidebar}>
      <div className={styles.createPostBtn}>
        <Link href="/createPost">
          <button>Create a post</button>
        </Link>
      </div>
    </section>
  );
}
