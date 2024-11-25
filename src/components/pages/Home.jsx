import React from "react";
import { useState, useEffect } from "react";
import Banner from "../commons/Banner";
import Newsletter from "../commons/Newsletter";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [recentPost, setRecentPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const api = "http://localhost:5000";
      const response = await fetch(`${api}/posts/get-posts`);
      const data = await response.json();
      // console.log(data);
      setRecentPosts(data.slice(-5));

      setPosts(data.slice(4));
    }
    getPosts();
  }, []);

  console.log(posts);

  return (
    <>
      <main>
        <Banner post={recentPost} />
        <Newsletter />
      </main>
    </>
  );
}
