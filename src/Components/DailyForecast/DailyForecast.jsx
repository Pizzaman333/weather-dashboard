import React from "react";
import styles from "./DailyForecast.module.scss";

import sunImg from "../../Images/Weather/sun.svg";
import overcastImg from "../../Images/Weather/overcast.svg";
import cloudyImg from "../../Images/Weather/cloudy.svg";
import rainImg from "../../Images/Weather/rain.png";

import snowImg from "../../Images/Weather/snow.png";
import stormImg from "../../Images/Weather/thunderstorm.png";
import mistImg from "../../Images/Weather/mist.png";

const getWeatherIcon = (weatherType) => {
  if (!weatherType) return <img src={sunImg} alt="sun" />;

  const type = weatherType.toLowerCase();

  if (type.includes("thunder") || type.includes("storm")) {
    return <img src={stormImg} alt="Thunderstorm" />;
  }

  if (type.includes("snow") || type.includes("sleet") || type.includes("ice")) {
    return <img src={snowImg} alt="Snow" />;
  }

  if (
    type.includes("rain") ||
    type.includes("drizzle") ||
    type.includes("shower")
  ) {
    return <img src={rainImg} alt="Rain" />;
  }

  if (
    type.includes("mist") ||
    type.includes("fog") ||
    type.includes("haze") ||
    type.includes("smoke")
  ) {
    return <img src={mistImg} alt="Mist" />;
  }

  if (type.includes("overcast")) {
    return <img src={overcastImg} alt="Overcast" />;
  }

  if (type.includes("cloud")) {
    return <img src={cloudyImg} alt="Cloudy" />;
  }

  // Default / Clear
  return <img src={sunImg} alt="Clear sky" />;
};

const DailyForecast = ({ forecast }) => {
  return (
    <div className={styles["daily-forecast"]}>
      <h3 className={styles["daily-forecast__title"]}>5-day forecast</h3>

      <div className={styles["daily-forecast__list"]}>
        {forecast.map((day, index) => (
          <div className={styles["daily-forecast__item"]} key={index}>
            <div className={styles["daily-forecast__date"]}>{day.date}</div>

            <div className={styles["daily-forecast__dets"]}>
              <div className={styles["daily-forecast__img"]}>
                {getWeatherIcon(day.type)}
              </div>

              <div className={styles["daily-forecast__temp"]}>
                <span className={styles["daily-forecast__high"]}>
                  {day.high !== undefined ? day.high : "--"}°
                </span>
                <span className={styles["daily-forecast__low"]}>
                  /{day.low !== undefined ? day.low : "--"}°
                </span>
              </div>
            </div>

            <div className={styles["daily-forecast__desc"]}>
              {day.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
