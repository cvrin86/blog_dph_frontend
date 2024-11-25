import { useEffect, useState } from "react";
import PostForm from "../commons/PostForm";
import { useRouter } from "next/router";

const UpdatePost = ({ idPost }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Changement: stocker l'erreur spécifique

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (!idPost) return;

      setLoading(true);
      setError(null); // Réinitialiser l'erreur avant chaque nouvelle requête

      try {
        const response = await fetch(
          `https://blog-dph-backend-5btts0n61-cristinavrs-projects.vercel.app/posts/get-post/${idPost}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du post.");
        }

        const data = await response.json();
        setPost(data.posts[0]);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Une erreur s'est produite lors de la récupération du post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [idPost]);

  if (loading) {
    return <p>Chargement du post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Si aucun post n'a été trouvé
  if (!post) {
    return <p>Le post que vous essayez de modifier n'existe pas.</p>;
  }

  return (
    <PostForm
      isEditing={true}
      initialData={post}
      onSuccess={(updatedPost) => {
        alert("Post mis à jour !");
        router.push("/dashboard"); // Rediriger après la mise à jour
      }}
    />
  );
};

export default UpdatePost;
