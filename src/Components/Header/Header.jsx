import styles from "./Header.module.scss";
import { Container } from "../Container/Container";
import { ReactComponent as LogoSvg } from "../../Images/Icons/logo.svg";
import { ReactComponent as AccountSvg } from "../../Images/Icons/account.svg";

const Header = () => {
  const navItems = [
    { name: "Who we are", href: "#" },
    { name: "Contacts", href: "#" },
    { name: "Menu", href: "#" },
  ];

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__container}>
          
          <div className={styles.header__left}>
            <div className={styles.header__logo__container}>
              <LogoSvg className={styles.header__logo} />
            </div>
            <nav className={styles.header__nav}>
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className={styles.header__link}>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.header__right}>
            <button type="button" className={styles['header__signup-btn']}>
              Sign Up
            </button>
            <button className={styles.header__profile}>
              <AccountSvg className={styles['header__profile-icon']} />
            </button>
          </div>
          
        </div>
      </Container>
    </header>
  );
};

export default Header;