import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/CreatePost.module.css";

// Dynamically import react-quill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

const PostForm = ({ isEditing = false, initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    category: initialData.category || "",
    tags: initialData.tags || "",
  });
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    initialData.imagePath || null
  );
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Update state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setWordCount(value.split(" ").filter((word) => word !== "").length);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const postData = { ...formData, selectedImage };

    try {
      const response = await fetch(
        isEditing
          ? `http://localhost:5000/posts/post/${initialData._id}`
          : "http://localhost:5000/posts/create-post",
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();

      console.log(data)

      if (response.ok) {
        alert(
          isEditing
            ? "Post mis à jour avec succès !"
            : "Post créé avec succès !"
        );
        onSuccess(data);
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur s'est produite.");
    }
  };

  // Fetch images from Unsplash API
  const fetchImages = async () => {
    if (!formData.tags.trim()) {
      setImages([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/posts/get-images?tags=${encodeURIComponent(
          formData.tags
        )}`,
        { method: "POST", credentials: "include" }
      );
      const data = await response.json();
      setImages(data.imagePaths || []);
    } catch (error) {
      console.error("Erreur lors de la recherche d'images :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [formData.tags]);

  return (
    <div className={styles.createPostContainer}>
      <h1 className={styles.header}>
        {isEditing ? "Modifier le post" : "Créer un post"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.label}>
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Écrivez quelque chose..."
            theme="snow"
            className={styles.quillEditor}
          />
          <p className={styles.wordCount}>{wordCount} mots</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="category" className={styles.label}>
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="ville">Ville</option>
            <option value="fleur">Fleur</option>
            <option value="paysage">Paysage</option>
            <option value="animaux">Animaux</option>
            <option value="nourriture">Nourriture</option>
            <option value="nature">Nature</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="tags" className={styles.label}>
            Tags :
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        {loading ? (
          <p>Chargement des images...</p>
        ) : (
          <div className={styles.imageGallery}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`${styles.image} ${
                  selectedImage === img ? styles.selected : ""
                }`}
              />
            ))}
          </div>
        )}

        {selectedImage && (
          <div>
            <h3>Image sélectionnée :</h3>
            <img src={selectedImage} alt="Sélectionnée" />
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formData.title || !formData.description || !selectedImage}
        >
          {isEditing ? "Mettre à jour" : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
