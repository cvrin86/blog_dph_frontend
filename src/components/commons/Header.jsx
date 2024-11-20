import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/reducers/user";
import { useRouter } from "next/router";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Fonction pour ouvrir le menu
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  // Fonction pour fermer le menu
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); // Utilisation de Redux pour l'état de l'utilisateur

  // Fonction de déconnexion
  async function handleLogout() {
    const res = await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      credentials: "include", // Garde les cookies pour la session
    });
    await res.json(); // Traite la réponse
    dispatch(logout()); // Déconnecte l'utilisateur dans Redux
    router.push("/home");
  }

  // Affichage conditionnel de l'authentification
  let authSection;
  if (user.isConnected) {
    authSection = (
      <div className={styles.auth}>
        <p style={{ fontSize: "1.2rem" }}>
          Salut{" "}
          <span style={{ fontSize: "1.5rem", color: "teal" }}>
            {" "}
            {user.username}
          </span>
        </p>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    );
  } else {
    authSection = (
      <div className={styles.auth}>
        <Link href="/signin">
          <button>Se connecter</button>
        </Link>
      </div>
    );
  }

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
        <Link href="/">Accueil</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">A propos</Link>
        <Link href="/contact">Nous contacter</Link>
      </nav>

      {/* Logo */}
      <div className={styles.logo}>
        <Image src="/logo.png" width={100} height={80} alt="logo" />
      </div>

      {/* Affichage du bouton de connexion ou déconnexion */}
      {authSection}
    </header>
  );
}
