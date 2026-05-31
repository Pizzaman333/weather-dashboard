import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import { ReactComponent as LogoSvg } from "../../Images/Icons/logo.svg";
import { ReactComponent as AccountSvg } from "../../Images/Icons/account.svg";
import { ReactComponent as ArrowSvg } from "../../Images/Icons/arrow-down.svg";
import AuthModal from "../AuthModal/AuthModal";
import { useAuth } from "../../context/AuthContext";
import AccountModal from "../AccountModal/AccountModal";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const navItems = [
    { name: "Weather dashboard", href: "#weather-section" },
    { name: "Contacts", href: "#footer-section" },
    { name: "Explore news", href: "#news-section" },
    { name: "Explore images", href: "#slider-secion" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthOpen(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          isMenuOpen ? styles["header--open"] : ""
        }`}
      >
        <Container>
          <div className={styles["header__container"]}>
            <div className={styles["header__logo-wrapper"]}>
              <LogoSvg className={styles["header__logo"]} />
            </div>

            <nav className={styles["header__desktop-nav"]}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={styles["header__link"]}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className={styles["header__desktop-right"]}>
              {currentUser ? (
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <span style={{ fontWeight: 500 }}>
                   Hi, {currentUser.displayName || currentUser.email}
                 </span>
                 <button 
                   onClick={handleLogout} 
                   className={styles['header__signup-btn']}
                   style={{ background: '#e0e0e0' }} 
                 >
                   Log Out
                 </button>
               </div>
             ) : (
               <button 
               type="button"
                  className={styles['header__signup-btn']}
                  onClick={() => setIsAuthOpen(true)} 
               >
                 Sign Up
               </button>
             )}

            <button 
            type="button"
                 className={styles['header__profile']} 
                 onClick={() => setIsAccountOpen(true)}
                 disabled={!currentUser} 
               >
                  <AccountSvg className={styles['header__profile-icon']} />
               </button>

           </div>

            <button
              className={styles["header__mobile-toggle"]}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              Menu
              <ArrowSvg
                className={`
                ${styles["header__arrow"]} 
                ${isMenuOpen ? styles["header__arrow--rotated"] : ""}
              `}
              />
            </button>
          </div>

          <div
            className={`${styles["header__mobile-menu"]} ${
              isMenuOpen ? styles["header__mobile-menu--active"] : ""
            }`}
          >
            <Container>
              <div className={styles["header__mobile-content"]}>
                <nav className={styles["header__mobile-nav"]}>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={styles["header__mobile-link"]}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                <div className={styles["header__mobile-actions"]}>
                  <div className={styles["header__mobile-profile"]} onClick={() => setIsAccountOpen(true)} type="button" disabled={!currentUser} >
                    <AccountSvg
                      className={styles["header__mobile-profile-icon"]}
                    />
                  </div>

{currentUser ? (
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <span style={{ fontWeight: 500 }}>
                   Hi, {currentUser.displayName || currentUser.email}
                 </span>
                 <button 
                   onClick={handleLogout} 
                  className={styles["header__mobile-signup-btn"]}
                   style={{ background: '#e0e0e0' }} 
                 >
                   Log Out
                 </button>
               </div>
             ) : (
               <button 
               type="button"
                  className={styles["header__mobile-signup-btn"]}
                  onClick={openAuthModal}
               >
                 Sign Up
               </button>
             )}
                </div>
              </div>
            </Container>
          </div>
        </Container>
      </header>

      {isAuthOpen && <AuthModal onClose={closeAuthModal} />}

      {isAccountOpen && <AccountModal onClose={() => setIsAccountOpen(false)} />}
    </>
  );
};

export default Header;
