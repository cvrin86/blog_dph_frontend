import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  const date = new Date();
  // console.log(date);
  return (
    <footer className={styles.containerFooter}>
      <div>
        <Image src="/logo.png" width={100} height={80} alt={"logo"} />
      </div>
      <div>
        <nav className={styles.pagesLinks}>
          <Link href="/home">Accueil</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">A propos</Link>
          <Link href="/contact">Nous contacter</Link>
        </nav>

        {/* Logo */}
      </div>
      <hr />
      <div className={styles.copyright}>
        <span>Copyright {date.getFullYear()} BlogPhoto</span>
      </div>
    </footer>
  );
}
