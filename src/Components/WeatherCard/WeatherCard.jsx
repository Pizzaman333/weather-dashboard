import React, { useState } from "react";
import styles from "./WeatherCard.module.scss";
import { ReactComponent as HeartSvg } from "../../Images/Icons/heart.svg";
import { ReactComponent as SpinnerSvg } from "../../Images/Icons/spinner.svg";
import { ReactComponent as BinSvg } from "../../Images/Icons/bin.svg";

const WeatherCard = ({
  data,
  onRefresh,
  onDelete,
  onForecast,
  onDaily,
  onDetails,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

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
          <button className={styles["weather-card__icon-btn"]}>
            <HeartSvg
              className={`${styles["weather-card__icon"]} ${styles["weather-card__icon--heart"]}`}
            />
          </button>
        </div>

        <button
          onClick={() => onDetails(data)}
          className={styles["weather-card__more-btn"]}
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
