import React, { useState } from "react";
import styles from "./WeatherCard.module.scss";
// import { ReactComponent as HeartSvg } from "../../Images/Icons/heart.svg";
import { ReactComponent as SpinnerSvg } from "../../Images/Icons/spinner.svg";
import { ReactComponent as BinSvg } from "../../Images/Icons/bin.svg";
import { useAuth } from "../../context/AuthContext";

const WeatherCard = ({
  data,
  onRefresh,
  onDelete,
  onForecast,
  onDaily,
  onDetails,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { currentUser, userData, toggleCityLike } = useAuth();
  const isLiked = userData?.likedCities?.includes(data.name);

  const getLocalTime = (timezoneOffset) => {
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = utc + 1000 * timezoneOffset;
    const nd = new Date(cityTime);
    return nd.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getFormattedDate = (timezoneOffset) => {
    const d = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[d.getDay()];
    const dateString = d.toLocaleDateString("en-GB").replace(/\//g, ".");
    return `${dateString} | ${dayName}`;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleLike = () => {
    if (!currentUser) {
      alert("Please log in to save cities to your account!");
      return;
    }
    toggleCityLike(data.name);
  };

  return (
    <div className={styles["weather-card"]}>
      <div className={styles["weather-card__header"]}>
        <span className={styles["weather-card__city"]}>{data.name}</span>
        <span className={styles["weather-card__country"]}>
          {data.sys.country}
        </span>
      </div>

      <div className={styles["weather-card__time"]}>
        {getLocalTime(data.timezone)}
      </div>

      <div className={styles["weather-card__forecast"]}>
        <button
          className={styles["weather-card__forecast-btn"]}
          onClick={() => onForecast(data.name)}
        >
          Hourly forecast
        </button>

        <button
          className={styles["weather-card__forecast-btn"]}
          onClick={() => onDaily(data.name)}
          disabled={!currentUser} // Disable if no user
          title={!currentUser ? "Log in to view daily forecast" : ""}
        >
          Daily forecast
        </button>
      </div>

      <div className={styles["weather-card__date"]}>
        {getFormattedDate(data.timezone)}
      </div>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={data.weather[0].description}
        className={styles["weather-card__img"]}
      />

      <div className={styles["weather-card__temp"]}>
        {Math.round(data.main.temp)}°C
      </div>

      <div className={styles["weather-card__footer"]}>
        <div className={styles["weather-card__actions-left"]}>
          <button
            onClick={handleRefresh}
            className={styles["weather-card__icon-btn"]}
          >
            <SpinnerSvg
              className={`${styles["weather-card__icon"]} ${
                styles["weather-card__icon--refresh"]
              } ${isRefreshing ? styles["weather-card__icon--spin"] : ""}`}
            />
          </button>
          <button
            className={`${styles["weather-card__icon-btn"]}`}
            onClick={handleLike}
            title={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`${styles["weather-card__icon"]} ${styles["weather-card__icon--heart"]}`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={isLiked ? { fill: "#ff4542" } : {}}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => onDetails(data)}
          className={styles["weather-card__more-btn"]}
          disabled={!currentUser}
        >
          See more
        </button>

        <div className={styles["weather-card__actions-right"]}>
          <button
            onClick={onDelete}
            className={styles["weather-card__icon-btn"]}
          >
            <BinSvg
              className={`${styles["weather-card__icon"]} ${styles["weather-card__icon--bin"]}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
