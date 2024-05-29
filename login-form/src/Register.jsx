import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import "./styles/style.css";

export const Register = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Luodaan uusi käyttäjä Firebase Authin avulla
      const user = await createUserWithEmailAndPassword(auth, email, pass);
      console.log(user);
      navigate("/Login");
    } catch (error) {
      setErrorMessage("Tilin luominen ei onnistu. Yritä myöhemmin uudelleen.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Luo tunnus</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Sähköposti</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your.email@mail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Salasana</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="login-btn" type="submit">
          Luo tili
        </button>
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <button className="register-btn" onClick={() => navigate("/Login")}>
        Onko sinulla jo tunnukset? Kirjaudu sisään täältä.
      </button>
    </div>
  );
};
