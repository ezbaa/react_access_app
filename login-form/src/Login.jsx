import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

export const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Kirjautuminen Firebase Authin avulla
      const user = await signInWithEmailAndPassword(auth, email, pass);
      console.log(user);
      navigate("/doors");
    } catch (error) {
      setErrorMessage("Tunnusta ei ole olemassa tai ne ovat väärin");
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Kirjaudu sisään</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
          Kirjaudu
        </button>
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <button className="register-btn" onClick={() => navigate("/Register")}>
        Eikö sinulla ole tunnuksia? Rekisteröidy täällä.
      </button>
    </div>
  );
};
