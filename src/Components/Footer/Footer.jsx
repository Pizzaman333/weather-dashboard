import React from "react";
import styles from "./Footer.module.scss";
import { ReactComponent as LogoSvg } from "../../Images/Icons/logo.svg";
import { Container } from "../Container/Container";

const Footer = () => {
  return (
    <footer className={styles.footer} id="footer-section">
      <Container>
          <div className={styles["footer__content"]}>
            <LogoSvg className={styles["footer__logo"]} />

            <div>
              <h3 className={styles["footer__title"]}>Address</h3>
              <address className={styles["footer__address-text"]}>
                <p>Svobody str. 35</p>
                <p>Kyiv</p>
                <p>Ukraine</p>
              </address>
            </div>

            <div>
              <h3 className={styles["footer__title"]}>Contact us</h3>
              <div className={styles["footer__socials"]}>
                <a
                  href="https://www.instagram.com/"
                  className={styles["footer__social-link"]}
                  target="blank"
                >
                </a>
                <a
                  href="https://www.facebook.com/"
                  className={styles["footer__social-link"]}
                  target="blank"
                >
                </a>
                <a
                  href="https://www.whatsapp.com/"
                  className={styles["footer__social-link"]}
                  target="blank"
                >
                </a>
              </div>
            </div>
          </div>
      </Container>
    </footer>
  );
};

export default Footer;
