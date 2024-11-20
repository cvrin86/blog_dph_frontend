import { useEffect, useState } from "react";
import PostCard from "../commons/PostCard";
import styles from "../../styles/PostPage.module.css"; // Assurez-vous que le composant PostCard est importé

export default function PostPage({ idPost }) {
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]); // Utilisez un tableau vide au début
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const api = "http://localhost:5000";

  // Chargement du post spécifique
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true); // Début du chargement
        const res = await fetch(`${api}/posts/get-post/${idPost}`);

        if (!res.ok) {
          throw new Error("Erreur lors du chargement du post");
        }

        const data = await res.json();

        // console.log(data); // Pour déboguer

        setPost(data?.posts[0]); // Accéder au premier post dans le tableau "posts"
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    if (idPost) {
      fetchPost(); // Lance la requête lorsque l'ID est disponible
    }
  }, [idPost]);

  // Chargement des articles récents
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`${api}/posts/get-posts?limit=3`);
        const data = await res.json();

        if (res.ok) {
          // console.log(data);
          setRecentPosts(data); // Définir "posts" directement comme tableau
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecentPosts(); // Récupérer les posts récents à chaque chargement
  }, []);

  // Affichage si les données sont en train de charger
  if (loading) {
    return <p className={styles.loadingText}>Chargement...</p>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <p className={styles.errorText}>
        Une erreur est survenue lors du chargement du post.
      </p>
    );
  }

  return (
    <div className={styles.postPageContainer}>
      {/* Affichage du post principal */}
      {post ? (
        <>
          <img src={post.imagePath} alt={post.title} />
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </>
      ) : (
        <p>Le post n'a pas été trouvé.</p>
      )}

      {/* Affichage des articles récents */}
      <div className={styles.recentPostsSection}>
        <h1>Articles récents</h1>
        <div className={styles.recentPostsContainer}>
          {/* Si recentPosts est un tableau, on itère avec .map */}
          {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))
          ) : (
            <p className={styles.recentPostsEmpty}>
              Aucun article récent disponible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
