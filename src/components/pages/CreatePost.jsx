import React, { useState, useEffect } from "react";
import styles from "../../styles/CreatePost.module.css";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

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

  useEffect(() => {
    if (!submitted) {
      fetchImagesFromUnsplash();
    }
  }, [formData.tags, submitted]);

  return (
    <div className={styles.containerFormPost}>
      <h1 className={styles.title}>
        Créer un article en function d'une image{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.div}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Écrivez quelque chose..."
          />
        </div>

        <div className={styles.div}>
          <label htmlFor="category"></label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="town">Ville</option>
            <option value="flower">Fleurs</option>
            <option value="landscape">Paysage</option>
            <option value="animal">Animaux</option>
            <option value="food">Nouriture</option>
            <option value="nature">Nature</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div className={styles.div}>
          <label htmlFor="tags">Tags : </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>

        {loading ? (
          <p>Chargement des images...</p>
        ) : (
          images.length > 0 && (
            <div className={styles.imageGallery}>
              <h3>Choisissez une image :</h3>
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={styles.imageItem}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img src={imageUrl} alt={`Image ${index}`} />
                </div>
              ))}
            </div>
          )
        )}

        {selectedImage && (
          <div className={styles.selectedImage}>
            <h3>Image sélectionnée :</h3>
            <img src={selectedImage} alt="Image sélectionnée" />
          </div>
        )}

        <div className={styles.div}>
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
