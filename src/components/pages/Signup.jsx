import React, { useState } from "react";
import styles from "../../styles/Signup.module.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/user";

export default function Signup() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const {
    register: signupForm,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupFormError },
    reset: resetSignupForm,
  } = useForm({
    mode: "onBlur",
  });

  const handleSignup = async (data) => {
    const res = await fetch("https://blog-dph-backend-5btts0n61-cristinavrs-projects.vercel.app/users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataSignup = await res.json();
    if (dataSignup.result) {
      resetSignupForm();
      toast.success("Account successfully created");
      router.push("/dashboard");
      dispatch(login(data.username)); // Connecte l'utilisateur
    } else {
      console.error("Username already exists, please use another one", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Inscription</h1>
      <form
        className={styles.signupForm}
        onSubmit={handleSignupSubmit(handleSignup)}
      >
        <div className={styles.signupFormField}>
          <label className={styles.signupFormLabel} htmlFor="username">
            Votre username
          </label>
          <input
            id="username"
            className={styles.signupFormInput}
            type="text"
            placeholder="Username"
            {...signupForm("username", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must have at least 3 characters",
              },
            })}
          />
          {signupFormError.username && (
            <span className={styles.errorMsg}>
              {signupFormError.username.message}
            </span>
          )}
        </div>

        <div className={styles.signupFormField}>
          <label className={styles.signupFormLabel} htmlFor="email">
            Votre email
          </label>
          <input
            id="email"
            className={styles.signupFormInput}
            type="email"
            placeholder="Email"
            {...signupForm("email", {
              required: "Email address is required",
            })}
          />
          {signupFormError.email && (
            <span className={styles.errorMsg}>
              {signupFormError.email.message}
            </span>
          )}
        </div>

        <div className={styles.signupFormField}>
          <label className={styles.signupFormLabel} htmlFor="password">
            Votre mot de passe
          </label>
          <input
            id="password"
            className={styles.signupFormInput}
            type="password"
            placeholder="Password"
            {...signupForm("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />
          {signupFormError.password && (
            <span className={styles.errorMsg}>
              {signupFormError.password.message}
            </span>
          )}
        </div>

        <div>
          <button className={styles.signupFormButton} type="submit">
            Envoyer
          </button>
        </div>
      </form>

      <div className={styles.signupLoginSection}>
        <span className={styles.signupLoginText}>
          Vous êtes déjà inscrit? Cliquez ici:{" "}
        </span>
        <Link href="/signin" className={styles.signupLoginLink}>
          <button className={styles.signupLoginButton}>Se connecter</button>
        </Link>
      </div>
    </div>
  );
}
