import React, { useState } from "react";
import styles from "./AccountModal.module.scss";
import { useAuth } from "../../context/AuthContext";

const AccountModal = ({ onClose }) => {
  const { currentUser, userData, resetPassword, toggleCityLike } = useAuth();
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await resetPassword(currentUser.email);
      setResetSent(true);
    } catch (error) {
      console.error("Error sending reset email", error);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        <h2 className={styles.title}>My Account</h2>

        <div className={styles.section}>
          {/* USERNAME */}
          <div className={styles.inputGroup}>
            <label>Username</label>
            <div className={styles.displayField}>
              {currentUser?.displayName || "User"}
            </div>
          </div>

          {/* EMAIL */}
          <div className={styles.inputGroup}>
            <label>E-Mail</label>
            <div className={styles.displayField}>
              {currentUser?.email}
            </div>
          </div>

          {/* PASSWORD */}
          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordRow}>
              {/* Fake password dots */}
              <div className={styles.displayField}>••••••••••••</div>
              <button 
                className={styles.actionBtn} 
                onClick={handleResetPassword}
                disabled={resetSent}
              >
                {resetSent ? "Email Sent!" : "Reset"}
              </button>
            </div>
          </div>
        </div>

        {/* LIKED CITIES */}
        <h3 className={styles.citiesTitle}>Liked Cities</h3>
        
        <div className={styles.citiesList}>
          {userData?.likedCities && userData.likedCities.length > 0 ? (
            userData.likedCities.map((city) => (
              <div key={city} className={styles.cityItem}>
                <span>{city}</span>
                <button 
                  className={styles.removeBtn}
                  onClick={() => toggleCityLike(city)}
                  title="Remove city"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              No liked cities yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AccountModal;