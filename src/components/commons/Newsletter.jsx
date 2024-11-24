import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Newsletter.module.css"; // Importation des styles CSS Modules

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        reset(); // Réinitialise le formulaire
      } else {
        setError("email", {
          type: "manual",
          message: "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <h2 className={styles.newsletterTitle}>
          Abonnez-vous à notre Newsletter
        </h2>
        <p className={styles.newsletterDescription}>
          Recevez les dernières nouvelles et mises à jour directement dans votre
          boîte de réception.
        </p>

        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Entrez votre email"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Veuillez entrer un email valide",
              },
            })}
            className={styles.newsletterInput}
          />
          <button
            type="submit"
            className={`${styles.newsletterButton} ${
              isSubscribed ? styles.newsletterButtonDisabled : ""
            }`}
            disabled={isSubscribed}
          >
            {isSubscribed ? "Merci pour votre abonnement !" : "S'abonner"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
