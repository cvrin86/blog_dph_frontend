import React, { useState, useEffect } from "react";
import styles from "../../styles/DisplayPostsDash.module.css";

export default function DisplayPostsDash() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const api = "http://localhost:5000";
        const response = await fetch(`${api}/posts/get-posts-user`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(true);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  // Affichage de l'état de chargement ou de l'erreur
  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return (
      <p>
        Une erreur est survenue lors du chargement des posts. Veuillez
        réessayer.
      </p>
    );
  }

  // Gestion de la suppression (fonction temporaire)
  const handleDelete = (postId) => {
    console.log("Suppression du post avec l'ID : ", postId);
    // Vous pouvez ajouter la logique de suppression ici en appelant une API de suppression
  };

  // Gestion de la mise à jour (fonction temporaire)
  const handleUpdate = (postId) => {
    console.log("Mise à jour du post avec l'ID : ", postId);
    // Vous pouvez rediriger l'utilisateur vers une page de mise à jour ou ouvrir un formulaire de mise à jour
  };

  return (
    <section className={styles.sectionPostsUser}>
      <h1 className={styles.titlePostUser}>Liste des articles</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Date création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <img
                    src={post.imagePath}
                    alt={post.title}
                    className={styles.postImage}
                  />
                </td>
                <td>{post.title}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(post._id)}
                    className={styles.updateButton}
                  >
                    {" "}
                    <img src="/updated_icon.png" alt="icon delete" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className={styles.deleteButton}
                  >
                    <img src="/delete_icon.png" alt="icon delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
