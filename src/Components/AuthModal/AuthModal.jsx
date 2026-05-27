import React, { useState } from "react";
import styles from "./AuthModal.module.scss";
// import { ReactComponent as CloseIcon } from "../../Images/Icons/close.svg";

const AuthModal = ({ onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={handleContentClick}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>{isLoginMode ? "Log In" : "Sign up"}</h2>

        <form className={styles.form}>
          {!isLoginMode && (
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" placeholder="E-Mail" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLoginMode ? "Log In" : "Sign up"}
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
