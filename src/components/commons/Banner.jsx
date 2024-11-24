import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Banner.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Banner = ({ post }) => {
  const user = useSelector((state) => state.user.value);

  // État pour suivre l'index de l'image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Référence pour garder l'intervalle actif sans réinitialiser
  const intervalRef = useRef(null);

  // Récupérer les images du post (les trois dernières)
  const imagesToDisplay = post.map((item) => item.imagePath);

  // Fonction pour aller à l'image suivante
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesToDisplay.length);
  };

  // Fonction pour revenir à l'image précédente
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + imagesToDisplay.length) % imagesToDisplay.length
    );
  };

  // Défilement automatique des images toutes les 3 secondes
  useEffect(() => {
    // Si un intervalle existe déjà, on l'annule avant d'en créer un nouveau
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      nextImage();
    }, 2000); // Change d'image toutes les 3 secondes

    // Nettoyage de l'intervalle à la destruction du composant
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [imagesToDisplay.length]); // Ce useEffect s'exécute une seule fois au montage ou lors du changement d'images

  // Fonction pour aller à une image spécifique lorsqu'on clique sur un rond
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.carouselContainer}>
        {/* Conteneur pour l'image */}
        <div className={styles.carouselImageContainer}>
          <img
            className={styles.bannerImage}
            src={imagesToDisplay[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
          />
        </div>

        {/* Texte centré sur l'image */}
        <div className={styles.carouselTextContainer}>
          <h1>Bienvenue sur mon blog</h1>
          <p>
            <strong>
              {" "}
              Laissez-vous inspirer par les images et écrivez avec votre
              imagination.
            </strong>
          </p>
          <p>
            <strong>
              Chaque photo a une histoire à raconter. Quelle sera la vôtre ?
            </strong>
          </p>
          <p>
            <strong>Écrivez un article, à partir d’une image.</strong>
          </p>

          {user.isConnected ? (
            <Link href="/createPost" className={styles.link}>
              Publier un article
            </Link>
          ) : (
            <Link href="/signin" className={styles.link}>
              Publier un article
            </Link>
          )}
          <Link href="/blog" className={styles.link}>
            Voir tous les articles
          </Link>
        </div>

        {/* Indicateurs en bas */}
        <div className={styles.carouselIndicators}>
          {imagesToDisplay.map((_, index) => (
            <div
              key={index}
              className={`${styles.carouselIndicator} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => goToImage(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
