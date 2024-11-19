import React from "react";
import styles from "../../styles/Banner.module.css";
import Link from "next/link";

const Banner = ({ post }) => {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.bannerTitle}>Bienvenue sur mon blog</h1>
      <Link href="/create-article" className={styles.link}>
        Publier un article
      </Link>
      <img
        className={styles.bannerImage}
        src={post.imagePath}
        alt={post.title}
      />
    </div>
  );
};

export default Banner;
