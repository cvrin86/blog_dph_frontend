import React from "react";
import styles from "../../styles/PostCard.module.css"
import Link from "next/link";

const PostCard = ({ post }) => {
    console.log(post)

  const postLink = post?._id ? `/details-post/${post._id}` : null;

  return (
    <article className={styles.postCardContainer}>
     
      <Link href={postLink}>
        {" "}
       
        <img
          src={post.imagePath || "/placeholder.jpg"} 
          alt={post.title || "Image de l'article"} 
          className={styles.imagePostCard}
        />
      </Link>

    
      <h2 className={styles.titlePost}>
        {post.title || "Titre non disponible"}
      </h2>

      {post._id && (
        <Link href={`/details-post/${post._id}`} className={styles.readMoreBtn}>
          Lire l'article 
        </Link>
      )}
    </article>
  );
};

export default PostCard;