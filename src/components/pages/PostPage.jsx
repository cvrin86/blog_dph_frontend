import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Importer useForm
import PostCard from "../commons/PostCard";
import styles from "../../styles/PostPage.module.css";

export default function PostPage({ idPost }) {
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const api = "https://blog-dph-backend-5btts0n61-cristinavrs-projects.vercel.app";

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch post details by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${api}/posts/get-post/${idPost}`);
        if (!res.ok) {
          throw new Error("Erreur lors du chargement du post");
        }
        const data = await res.json();
        setPost(data?.posts[0]);
        setLikeCount(data?.posts[0]?.likes || 0);
        setComments(data?.posts[0]?.comments || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    if (idPost) {
      fetchPost();
    }
  }, [idPost]);

  // Fetch recent posts for sidebar
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`${api}/posts/get-posts?limit=3`);
        const data = await res.json();
        setRecentPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  const handleLike = async () => {
    try {
      const res = await fetch(`${api}/posts/like-post/${idPost}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Inclut le cookie dans la requête
      });

      if (res.ok) {
        setLikeCount(likeCount + 1);
      } else {
        console.error("Erreur lors de l'ajout du like");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du like", error);
    }
  };

  const handleCommentSubmit = async (data) => {
    // Vérifier si le commentaire n'est pas vide
    if (data.newComment.trim()) {
      const res = await fetch(`${api}/posts/comment-post/${idPost}`, {
        method: "POST",
        body: JSON.stringify({ content: data.newComment }), // Utilisation de newComment
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Inclut les cookies pour l'authentification
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setComments(updatedPost.comments);
        reset(); // Réinitialise le formulaire après soumission
      }
    }
  };

  return (
    <main className={styles.postPageContainer}>
      {post ? (
        <section className={styles.postContent}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <img
            src={post.imagePath}
            alt={`Image de l'article : ${post.title}`}
            className={styles.postImage}
          />
          <p className={styles.postDescription}>{post.description}</p>
        </section>
      ) : (
        <p>Le post n'a pas été trouvé.</p>
      )}

      {/* Section des likes */}
      <section className={styles.likesSection}>
        <button
          className={styles.likeButton}
          onClick={handleLike}
          aria-label="Ajouter un like"
        >
          👍 Like
        </button>
        <span className={styles.likeCount} aria-live="polite">
          {likeCount} Likes
        </span>
      </section>

      {/* Section des commentaires */}
      <section className={styles.commentsSection}>
        <h2>Commentaires</h2>
        {comments.length > 0 ? (
          <div className={styles.commentsList}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <p className={styles.commentAuthor}>{comment.author}</p>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}

        {/* Formulaire d'ajout de commentaire avec React Hook Form */}
        <form
          className={styles.commentForm}
          onSubmit={handleSubmit(handleCommentSubmit)}
        >
          <textarea
            id="newComment"
            {...register("newComment", {
              required: "Le commentaire ne peut pas être vide",
            })}
            rows="4"
            placeholder="Écrivez votre commentaire..."
          />

          {errors.newComment && (
            <p className={styles.errorMessage}>{errors.newComment.message}</p>
          )}
          <button type="submit" className={styles.submitCommentBtn}>
            Ajouter un commentaire
          </button>
        </form>
      </section>

      {/* Affichage des articles récents */}
      <section className={styles.recentPostsSection}>
        <h2>Articles récents</h2>
        <div className={styles.recentPostsContainer}>
          {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))
          ) : (
            <p>Aucun article récent disponible.</p>
          )}
        </div>
      </section>
    </main>
  );
}
