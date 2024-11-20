import React from "react";
import styles from "../../styles/Banner.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Banner = ({ post }) => {
  const user = useSelector((state) => state.user.value);
  // console.log(user);
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.bannerTitle}>Bienvenue sur mon blog</h1>
      {user.isConnected ? (
        <Link href="/createPost" className={styles.link}>
          Publier un article
        </Link>
      ) : (
        <Link href="/signin" className={styles.link}>
         Publier un article
        </Link>
      )}

      <img
        className={styles.bannerImage}
        src={post.imagePath}
        alt={post.title}
      />
    </div>
  );
};

export default Banner;
