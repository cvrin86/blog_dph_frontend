import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour ouvrir le menu
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  // Fonction pour fermer le menu
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.containerHeader}>
      {/* Icône burger - visible uniquement si le menu est fermé */}
      {!isMenuOpen && (
        <div className={styles.menuIcon} onClick={handleMenuOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#323272"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
      )}

      {/* Icône close - visible uniquement si le menu est ouvert */}
      {isMenuOpen && (
        <div className={styles.menuIcon} onClick={handleMenuClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      )}

      {/* Menu vertical */}
      <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <Link href="/home">Accueil</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">A propos</Link>
        <Link href="/contact">Nous contacter</Link>
      </nav>

      {/* Logo */}
      <div className={styles.logo}>
       
        <Image src="/logo.png"
        width={100}
        height={80} />
      
      </div>

      {/* Bouton d'inscription */}
      <div className={styles.auth}>
        <button>S'inscrire</button>
      </div>
    </header>
  );
}
