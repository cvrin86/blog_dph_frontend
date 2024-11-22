import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/user";
import { useRouter } from "next/router";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const router = useRouter();

  // Fonction pour ouvrir le menu
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuUserOpen = () => {
    setIsMenuUserOpen(true);
  };

  // Fonction pour fermer le menu
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleMenuUserClose = () => {
    setIsMenuUserOpen(false);
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
          Hello{" "}
          <span style={{ color: "teal" }}>
            
            {user.username}
          </span>
        </p>
        {!isMenuUserOpen && (
          <div className={styles.menuIconUser} onClick={handleMenuUserOpen}>
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 200 200"
  width="30"
  height="30"
>
  {/* <!-- Corps du chat --> */}
  <circle cx="100" cy="100" r="90" fill="#FFD700" />
  
  {/* <!-- Yeux --> */}
  <circle cx="65" cy="70" r="15" fill="#FFFFFF" />
  <circle cx="135" cy="70" r="15" fill="#FFFFFF" />
  <circle cx="65" cy="70" r="7" fill="#000000" />
  <circle cx="135" cy="70" r="7" fill="#000000" />
{/*   
  <!-- Oreilles --> */}
  <polygon points="45,20 65,10 85,20" fill="#FFD700" />
  <polygon points="115,20 135,10 155,20" fill="#FFD700" />
  
  {/* <!-- Museau --> */}
  <ellipse cx="100" cy="120" rx="25" ry="10" fill="#FFFFFF" />
  <circle cx="100" cy="120" r="5" fill="#000000" />
  
  {/* <!-- Moustaches --> */}
  <line x1="75" y1="120" x2="50" y2="130" stroke="#000000" stroke-width="2" />
  <line x1="125" y1="120" x2="150" y2="130" stroke="#000000" stroke-width="2" />
  <line x1="75" y1="125" x2="50" y2="135" stroke="#000000" stroke-width="2" />
  <line x1="125" y1="125" x2="150" y2="135" stroke="#000000" stroke-width="2" />

  {/* <!-- Bouche --> */}
  <path
    d="M85,140 Q100,150 115,140"
    stroke="red"
    stroke-width="10"
    fill="none"
  />
</svg>

          </div>
        )}

        {/* Icône close - visible uniquement si le menu est ouvert */}
        {isMenuUserOpen && (
          <div className={styles.menuIcon} onClick={handleMenuUserClose}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg> */}
          </div>
        )}

        {/* Menu vertical */}
        <nav
          className={`${styles.menuUser} ${
            isMenuUserOpen ? styles.menuOpen : ""
          }`}
        >
          <Link href="" onClick={handleMenuUserClose}>
            Mon profil
          </Link>
          <Link href="/dashboard" onClick={handleMenuUserClose}>
            Tableau de bord
          </Link>
          <Link href="" onClick={handleMenuUserClose}>
            <button onClick={handleLogout}>Se deconnecter</button>
          </Link>
        </nav>
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
        <Link href="/" onClick={handleMenuClose}>
          Accueil
        </Link>
        <Link href="/blog" onClick={handleMenuClose}>
          Blog
        </Link>
        <Link href="/about" onClick={handleMenuClose}>
          A propos
        </Link>
        <Link href="/contact" onClick={handleMenuClose}>
          Nous contacter
        </Link>
      </nav>

      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="logo" />
      </div>

      {/* Affichage du bouton de connexion ou déconnexion */}
      {authSection}
    </header>
  );
}
