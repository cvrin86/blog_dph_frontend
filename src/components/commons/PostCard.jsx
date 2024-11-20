import React from "react";
import styles from "../../styles/PostCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  // Vérification si post existe et possède un _id valide
  const postLink = post?._id ? `/details-post/${post._id}` : null;

  // On vérifie si l'auteur existe et a un username
  const authorName = post?.author?.username || "Auteur inconnu";

  return (
    <article className={styles.postCardContainer}>
      <Link href={postLink}>
        <img
          src={post.imagePath || "/placeholder.jpg"}
          alt={post.title || "Image de l'article"}
          className={styles.imagePostCard}
        />
      </Link>

      <h2 className={styles.titlePost}>
        {post.title || "Titre non disponible"}
      </h2>

      {/* Affichage du nom de l'auteur ou "Auteur inconnu" si pas d'auteur */}
      <p className={styles.authorName}> by <span style = {{color:"green", fontSize:"1rem"}}>{authorName}</span></p>

      {post._id && (
        <Link href={`/details-post/${post._id}`} className={styles.readMoreBtn}>
          Lire l'article
        </Link>
      )}
    </article>
  );
};

export default PostCard;
