import React from "react";
import styles from "../../styles/PostCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  const postLink = post?._id ? `/details-post/${post._id}` : null;
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

      <div className={styles.textContent}>
        <h2 className={styles.titlePost}>
          {post.title || "Titre non disponible"}
        </h2>

        <p className={styles.authorName}>
          by <span>{authorName}</span>
        </p>

        {post._id && (
          <Link
            href={`/details-post/${post._id}`}
            className={styles.readMoreBtn}
          >
            Lire
          </Link>
        )}
      </div>
    </article>
  );
};

export default PostCard;
