import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/CreatePost.module.css";

// Dynamically import react-quill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Importer les styles de base de Quill

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Mettre à jour l'état du formulaire à chaque changement dans les inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Mettre à jour la description et le comptage des mots à chaque modification
  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));
    setWordCount(value.split(" ").filter((word) => word !== "").length); // Compter les mots non vides
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert(
        "Veuillez sélectionner une image avant de soumettre le formulaire."
      );
      return;
    }

    const postData = { ...formData, selectedImage };
    console.log("Données à envoyer :", postData);

    try {
      const response = await fetch("http://localhost:5000/posts/create-post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Post créé avec succès !");
        setImages([]);
        setSelectedImage(null);
        setFormData({ title: "", description: "", category: "", tags: "" });
        setSubmitted(true);
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      alert("Une erreur s'est produite.");
    }
  };

  // Sélectionner une image de la galerie
  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Rechercher des images basées sur les tags
  const fetchImagesFromUnsplash = async () => {
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
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data.imagePaths) {
        setImages(data.imagePaths);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche sur Unsplash", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger des images chaque fois que les tags ou la soumission changent
  useEffect(() => {
    if (!submitted) {
      fetchImagesFromUnsplash();
    }
  }, [formData.tags, submitted]);

  // Calculer le nombre de mots dans la description et gérer la dynamique
  useEffect(() => {
    if (formData.description) {
      const words = formData.description
        .split(" ")
        .filter((word) => word !== "");
      setWordCount(words.length);
    }
  }, [formData.description]);

  return (
    <div className={styles.createPostContainer}>
      <h1 className={styles.header}>Créer un article avec une image</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Description Input (ReactQuill) */}
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
          <p className={styles.wordCount}>{wordCount} mots</p>{" "}
        </div>

        {/* Category Dropdown */}
        <div className={styles.inputContainer}>
          <label htmlFor="category" className={styles.label}>
            Catégorie
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="town">Ville</option>
            <option value="flower">Fleurs</option>
            <option value="landscape">Paysage</option>
            <option value="animal">Animaux</option>
            <option value="food">Nourriture</option>
            <option value="nature">Nature</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Tags Input */}
        <div className={styles.inputContainer}>
          <label htmlFor="tags" className={styles.label}>
            Tags :{" "}
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        {/* Image Gallery */}
        {loading ? (
          <p className={styles.loadingText}>Chargement des images...</p>
        ) : (
          images.length > 0 && (
            <div className={styles.imageGallery}>
              <h3 className={styles.imageGalleryTitle}>
                Choisissez une image :
              </h3>
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={styles.imageItem}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          )
        )}

        {/* Display Selected Image */}
        {selectedImage && (
          <div className={styles.selectedImageContainer}>
            <h3 className={styles.selectedImageTitle}>Image sélectionnée :</h3>
            <img
              src={selectedImage}
              alt="Image sélectionnée"
              className={styles.selectedImage}
            />
          </div>
        )}

        {/* Submit Button */}
        <div className={styles.submitButtonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={
              !formData.title || !formData.description || !selectedImage
            }
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
