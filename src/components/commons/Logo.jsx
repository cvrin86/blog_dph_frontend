import React from "react";
import styles from "../../styles/Logo.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="" />
      </div>
    </Link>
  );
};

export default Logo;
