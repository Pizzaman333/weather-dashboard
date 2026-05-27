import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import { ReactComponent as LogoSvg } from "../../Images/Icons/logo.svg";
import { ReactComponent as AccountSvg } from "../../Images/Icons/account.svg";
import { ReactComponent as ArrowSvg } from "../../Images/Icons/arrow-down.svg";
import AuthModal from "../AuthModal/AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navItems = [
    { name: "Who we are", href: "#" },
    { name: "Contacts", href: "#" },
    { name: "Menu", href: "#" },
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
              <button
                type="button"
                className={styles["header__signup-btn"]}
                onClick={openAuthModal}
              >
                Sign Up
              </button>
              <div className={styles["header__profile"]}>
                <AccountSvg className={styles["header__profile-icon"]} />
              </div>
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
                  <div className={styles["header__mobile-profile"]}>
                    <AccountSvg
                      className={styles["header__mobile-profile-icon"]}
                    />
                  </div>

                  <button
                    type="button"
                    className={styles["header__mobile-signup-btn"]}
                    onClick={openAuthModal}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </Container>
      </header>

      {isAuthOpen && <AuthModal onClose={closeAuthModal} />}
    </>
  );
};

export default Header;
