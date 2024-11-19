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
    const res = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataSignup = await res.json();
    if (dataSignup.result) {
      resetSignupForm();
      toast.success("Account successfully created");
      router.push("/home");
      dispatch(login(data.username)); // Connecte l'utilisateur
    } else {
      console.error("Username already exists, please use another one", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.containerSignup}>
      <h1>Inscription</h1>
      <form
        className={styles.formSignup}
        onSubmit={handleSignupSubmit(handleSignup)}
      >
        <div>
          <label htmlFor="">Votre username</label>
          <input
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
        <div>
          <label htmlFor="">Votre email</label>
          <input
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
        <div>
          <label htmlFor="">Votre mot de passe</label>
          <input
            type="password"
            placeholder="Password"
            {...signupForm("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
              // pattern: {
              //   value:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //   message:
              //     "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character.",
              // },
            })}
          />
          {signupFormError.password && (
            <span className={styles.errorMsg}>
              {signupFormError.password.message}
            </span>
          )}
        </div>
        <div>
          <button type="submit">Envoyer</button>
        </div>
      </form>
      <div>
        <span>Vous etes dejà inscrit? Click ici: </span>
        <Link href="/signin">
          <button style = {{border : "none", backgroundColor:"transparent",color:"#d17307"}}>Se connecter</button>
        </Link>
      </div>
    </div>
  );
}

