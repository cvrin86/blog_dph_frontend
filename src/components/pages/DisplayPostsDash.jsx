import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/DisplayPostsDash.module.css";

export default function DisplayPostsDash() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(null); // Ajouter un état pour gérer les erreurs de suppression
  const api = "https://blog-dph-backend-5btts0n61-cristinavrs-projects.vercel.app";
  const router = useRouter();

  // Charger les posts de l'utilisateur
  useEffect(() => {
    async function getPosts() {
      try {
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

  // Supprimer un post avec confirmation
  const handleDelete = useCallback(async (postId) => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer ce post ?"
    );
    if (!confirmDelete) return;

    // Optimisation: suppression immédiate du post dans l'UI
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

    try {
      const response = await fetch(`${api}/posts/post/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du post");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setDeleteError("Une erreur s'est produite lors de la suppression."); // Définir l'erreur de suppression
      // Réajout du post en cas d'erreur
      setPosts((prevPosts) => [
        ...prevPosts,
        { _id: postId, title: "Post supprimé en erreur" }, // Ajout d'un titre temporaire
      ]);
    }
  }, []);

  // Rediriger vers la page de mise à jour
  const handleUpdate = useCallback(
    (postId) => {
      router.push(`/update-post/${postId}`); // Correction ici : utilisation de postId
    },
    [router]
  );

  // Afficher l'état de chargement ou les erreurs
  if (loading) {
    return <p>Chargement des posts...</p>;
  }

  if (error) {
    return (
      <p>
        Une erreur est survenue lors du chargement des posts. Veuillez réessayer
        plus tard.
      </p>
    );
  }

  // Afficher un message si aucun post n'est disponible
  if (posts.length === 0) {
    return <p>Aucun post disponible pour l'instant.</p>;
  }

  return (
    <section className={styles.sectionPostsUser}>
      <h1 className={styles.titlePostUser}>Liste des articles</h1>
      <div className={styles.tableContainer}>
        {deleteError && <p className={styles.deleteError}>{deleteError}</p>} {/* Affichage de l'erreur de suppression */}
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
                  {post.imagePath && (
                    <img
                      src={post.imagePath}
                      alt={post.title}
                      className={styles.postImage}
                    />
                  )}
                </td>
                <td>{post.title}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(post._id)}
                    className={styles.updateButton}
                  >
                    <img src="/updated_icon.png" alt="Modifier" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className={styles.deleteButton}
                  >
                    <img src="/delete_icon.png" alt="Supprimer" />
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
