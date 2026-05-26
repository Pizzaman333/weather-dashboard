import React from "react";
import styles from "./WeatherDetails.module.scss";
import thermometerImg from "../../Images/Weather/temperature-2x.webp";
import humidityImg from "../../Images/Weather/humidity-2x.webp";
import pressureImg from "../../Images/Weather/pressure-2x.webp";
import visibilityImg from "../../Images/Weather/visibility-2x.webp";
import windImg from "../../Images/Weather/wind-2x.webp";
// import { Container } from "../Container/Container";

const WeatherDetails = ({ weatherData }) => {
  const {
    feels_like,
    min_temp,
    max_temp,
    humidity,
    pressure,
    wind_speed,
    visibility,
  } = weatherData;

  const formattedVisibility =
    visibility >= 10000 ? "Unlimited" : `${visibility} m`;

  return (
    <section className={styles["weather-details"]}>
        <ul className={styles["weather-details__list"]}>
          <li className={styles["weather-details__item"]}>
            <span className={styles["weather-details__label"]}>Feels like</span>
            <p className={styles["weather-details__value"]}>{feels_like}°C</p>
              <img
                src={thermometerImg}
                alt="thermometer"
                className={styles["weather-details__img"]}
              />
          </li>

          <li className={styles["weather-details__item"]}>
            <div className={styles["weather-details__row"]}>
              <span className={styles["weather-details__label"]}>Min °C</span>
              <p className={styles["weather-details__value"]}>{min_temp}°C</p>
            </div>
            <div className={styles["weather-details__row"]}>
              <span className={styles["weather-details__label"]}>Max °C</span>
              <p className={styles["weather-details__value"]}>{max_temp}°C</p>
            </div>
          </li>

          <li className={styles["weather-details__item"]}>
            <span className={styles["weather-details__label"]}>Humidity</span>
            <p className={styles["weather-details__value"]}>{humidity}%</p>
              <img
                src={humidityImg}
                alt="humidity"
                className={styles["weather-details__img"]}
              />
          </li>

          <li className={styles["weather-details__item"]}>
            <span className={styles["weather-details__label"]}>Pressure</span>
            <p className={styles["weather-details__value"]}>{pressure} Pa</p>
              <img
                src={pressureImg}
                alt="pressure"
                className={styles["weather-details__img"]}
              />
          </li>

          <li className={styles["weather-details__item"]}>
            <span className={styles["weather-details__label"]}>Wind speed</span>
            <p className={styles["weather-details__value"]}>{wind_speed} m/s</p>
              <img
                src={windImg}
                alt="wind"
                className={styles["weather-details__img"]}
              />
          </li>

          <li className={styles["weather-details__item"]}>
            <span className={styles["weather-details__label"]}>Visibility</span>
            <p className={styles["weather-details__value"]}>
              {formattedVisibility}
            </p>
              <img
                src={visibilityImg}
                alt="visibility"
                className={styles["weather-details__img"]}
              />
          </li>
        </ul>
    </section>
  );
};

export default WeatherDetails;
