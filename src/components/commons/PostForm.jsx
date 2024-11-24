import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/CreatePost.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const PostForm = ({ isEditing = false, initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        tags: initialData.tags,
      });
      setSelectedImage(initialData.imagePath[0] || null);
    }
  }, [isEditing, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setWordCount(value.split(" ").filter((word) => word !== "").length);
  };

  const fetchImages = async () => {
    const tagsString = String(formData.tags).trim();

    if (!tagsString) {
      setImages([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/posts/get-images?tags=${encodeURIComponent(
          tagsString
        )}`
      );
      const data = await response.json();
      setLoading(false);

      if (data.imagePaths) {
        setImages(data.imagePaths);
      } else {
        console.error("Aucune image trouvée.");
        setImages([]);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'images :", error);
      setLoading(false);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [formData.tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const postData = { ...formData, selectedImage };
    const url = isEditing
      ? `http://localhost:5000/posts/update-post/${initialData._id}`
      : "http://localhost:5000/posts/create-post";

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
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
