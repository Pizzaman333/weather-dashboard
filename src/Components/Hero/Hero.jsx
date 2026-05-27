import { useState } from "react";
import styles from "./Hero.module.scss";
import { Container } from "../Container/Container";
import { ReactComponent as SearchSvg } from "../../Images/Icons/search.svg";

const Hero = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const today = new Date();

  const monthYear = today.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const getDayWithSuffix = (date) => {
    const day = date.getDate();
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const fullDayString = `${dayName}, ${getDayWithSuffix(today)}`;

  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles["hero__container"]}>
          <h1 className={styles["hero__title"]}>Weather dashboard</h1>

          <div className={styles["hero__info"]}>
            <div
              className={`${styles["hero__text-block"]} ${styles["hero__text-block--left"]}`}
            >
              <p>
                Create your personal list of favorite cities and always be aware
                of the weather.
              </p>
            </div>

            <div className={styles["hero__separator"]}></div>

            <div className={`${styles["hero__text-block"]}`}>
              <p>{monthYear}</p>
              <p>{fullDayString}</p>
            </div>
          </div>

          <div className={styles["hero__search"]}>
            <input
              type="text"
              placeholder="Search location..."
              className={styles["hero__search-input"]}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles["hero__search-btn"]}
              onClick={handleSearchClick}
            >
              <SearchSvg className={styles["hero__search-icon"]} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
