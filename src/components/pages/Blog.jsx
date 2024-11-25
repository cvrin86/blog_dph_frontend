import React, { useState, useEffect } from "react";
import styles from "../../styles/Blog.module.css";
import PostCard from "../commons/PostCard";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const api = "https://blog-dph-backend-5btts0n61-cristinavrs-projects.vercel.app";
      const response = await fetch(`${api}/posts/get-posts`);
      const data = await response.json();
      setRecentPosts(data.slice(-5));
      setPosts(data.slice(4));
    }
    getPosts();
  }, []);

  return (
    <>
      <main className={styles.mainContainer}>
        <header className={styles.headerContainer}>
          <h1 className={styles.title}>Les derniers articles du blog</h1>
          <p className={styles.subtitle}>
            Découvrez nos dernières publications et explorez des histoires
            captivantes.
          </p>
        </header>

        {posts && posts.length > 0 ? (
          <div className={styles.containerPost}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className={styles.loadingText}>Chargement des posts...</p>
        )}
      </main>
    </>
  );
}
