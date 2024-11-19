import React from "react";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import PostCard from "../commons/PostCard";
import Banner from "../commons/Banner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [recentPost, setRecentPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const api = "http://localhost:5000";
      const response = await fetch(`${api}/posts/get-posts`);
      const data = await response.json();
      // console.log(data);
      setRecentPosts(data[0]);

      setPosts(data.slice(1));
    }
    getPosts();
  }, []);

  return (
    <>
      <Banner post={recentPost} />
      <main>
        {posts && posts.length > 0 ? (
          <div>
            <h1 style={{ padding: "80px", textAlign: "center" }}>
              Articles récents
            </h1>
            <div className={styles.containerPost}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <p>Chargement des posts...</p>
        )}
      </main>
    </>
  );
}
