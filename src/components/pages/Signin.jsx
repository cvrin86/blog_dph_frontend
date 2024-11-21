import React, { useState } from "react";
import styles from "../../styles/Signin.module.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/user";

export default function Signin() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const {
    register: signinForm,
    handleSubmit: handleSigninSubmit,
    formState: { errors: signinFormError },
    reset: resetSigninForm,
  } = useForm({
    mode: "onBlur",
  });

  const handleSignin = async (data) => {
    const res = await fetch("http://localhost:5000/users/signin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataSignin = await res.json();
    if (dataSignin.result) {
      resetSigninForm();
      toast.success("Account successfully connected");
      router.push("/dashboard");
      dispatch(login(data.username)); // Connecte l'utilisateur
    } else {
      setErrorMsg("Wrong username / password");
      toast.error("Invalid credentials", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.signinContainer}>
      <h1 className={styles.signinTitle}>Se connecter</h1>
      <form
        className={styles.signinForm}
        onSubmit={handleSigninSubmit(handleSignin)}
      >
        <div className={styles.signinFormField}>
          <label className={styles.signinFormLabel} htmlFor="username">
            Votre username
          </label>
          <input
            id="username"
            className={styles.signinFormInput}
            type="text"
            placeholder="Username"
            {...signinForm("username", { required: "Username is required" })}
          />
          {signinFormError.username && (
            <span className={styles.errorMsg}>
              {signinFormError.username.message}
            </span>
          )}
        </div>

        <div className={styles.signinFormField}>
          <label className={styles.signinFormLabel} htmlFor="password">
            Votre mot de passe
          </label>
          <input
            id="password"
            className={styles.signinFormInput}
            type="password"
            placeholder="Password"
            {...signinForm("password", { required: "Password is required" })}
          />
          {signinFormError.password && (
            <span className={styles.errorMsg}>
              {signinFormError.password.message}
            </span>
          )}
        </div>

        <div>
          <button className={styles.signinFormButton} type="submit">
            Envoyer
          </button>
        </div>
      </form>
      <div className={styles.signinRegisterSection}>
        <span className={styles.signinRegisterText}>
          Vous n'avez pas de compte? S'inscrire ici:{" "}
        </span>
        <Link href="/signup" className={styles.signinRegisterLink}>
          <button className={styles.signinRegisterButton}>S'inscrire</button>
        </Link>
      </div>
    </div>
  );
}
