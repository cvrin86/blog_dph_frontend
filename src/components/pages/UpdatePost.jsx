
import { useEffect, useState } from "react";
import PostForm from "../commons/PostForm";

const UpdatePost = ({ idPost }) => {
  console.log(idPost)
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(post);
  // Récupère les données du post à mettre à jour
  useEffect(() => {
    const fetchPost = async () => {
      if (!idPost) return;

      try {
        const response = await fetch(`http://localhost:5000/posts/post/${idPost}`, {
          method: "PUT",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [idPost]);



  // Afficher l'état de chargement ou les erreurs
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return (
      <p>
        Une erreur est survenue lors du chargement des données. Veuillez
        réessayer plus tard.
      </p>
    );
  }

  // Affiche le formulaire si les données du post sont disponibles
  return (
    <PostForm
      isEditing
      initialData={post}
      onSuccess={(updatedPost) => {
        alert("Post mis à jour !");
        router.push("/dashboard"); // Redirige vers le tableau de bord après la mise à jour
      }}
    />
  );
};

export default UpdatePost;
