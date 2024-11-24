import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import Logo from "./Logo";

export default function Footer() {
  const date = new Date();

  return (
    <footer className={styles.containerFooter}>
     <Logo/>
      <div>
        <nav className={styles.pagesLinks}>
          <Link href="/home">Accueil</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">A propos</Link>
          <Link href="/contact">Nous contacter</Link>
        </nav>
      </div>
      <hr className={styles.hr} />
      <div className={styles.copyright}>
        <span>Copyright {date.getFullYear()} BlogPhoto</span>
      </div>
    </footer>
  );
}
