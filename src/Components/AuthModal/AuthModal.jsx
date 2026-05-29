import React, { useState } from "react";
import styles from "./AuthModal.module.scss";
import { useAuth } from "../../context/AuthContext"; 

const AuthModal = ({ onClose }) => {
  const { signup, login } = useAuth(); 

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); 
  setIsLoading(true);

  try {
    if (isLoginMode) {
      await login(email, password);
    } else {
      await signup(email, password, username);
    }
    onClose();
  } catch (err) {
    console.error(err); 

    let msg = "Failed to authenticate.";
    
    if (err.code === "auth/weak-password") {
      msg = "Password must be at least 6 characters.";
    } else if (err.code === "auth/email-already-in-use") {
      msg = "This email is already registered.";
    } else if (err.code === "auth/invalid-email") {
      msg = "Please enter a valid email address.";
    } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
      msg = "Invalid email or password.";
    }

    setError(msg);
  }

  setIsLoading(false);
};

   const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
  };


  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>{isLoginMode ? "Log In" : "Sign up"}</h2>

        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>E-Mail</label>
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLoginMode ? "Log In" : "Sign up"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
            <span className={styles.link} onClick={toggleMode}>
              {isLoginMode ? "Sign Up" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
