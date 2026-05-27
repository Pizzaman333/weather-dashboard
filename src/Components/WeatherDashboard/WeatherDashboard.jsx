import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import styles from "./WeatherDashboard.module.scss";
import { Container } from "../Container/Container";
import WeatherCard from "../WeatherCard/WeatherCard";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import DailyForecast from "../DailyForecast/DailyForecast";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherDashboard = ({ cities, onRemoveCity }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCityName, setActiveCityName] = useState(null); // Which city is expanded?
  const [activeMode, setActiveMode] = useState(null);

  const [currentDetailedData, setCurrentDetailedData] = useState(null);
  const [currentForecastData, setCurrentForecastData] = useState([]);
  const [isForecastLoading, setIsForecastLoading] = useState(false);

  const [currentDailyData, setCurrentDailyData] = useState([]);

  const detailsSectionRef = useRef(null);

  const handleShowDaily = async (cityName) => {
    setIsForecastLoading(true);
    setActiveCityName(cityName);
    setActiveMode("daily");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      const dailyData = response.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );

      const mappedDaily = dailyData.map((item) => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        });

        return {
          date: dateString,
          type: item.weather[0].main,
          description: item.weather[0].description,
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
        };
      });

      setCurrentDailyData(mappedDaily);
    } catch (error) {
      console.error("Error fetching daily forecast:", error);
    } finally {
      setIsForecastLoading(false);
    }
  };

  const fetchWeather = useCallback(async () => {
    if (!cities || cities.length === 0) {
      setWeatherData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const promises = cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
      );
      const responses = await Promise.all(promises);
      setWeatherData(responses.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }, [cities]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    if (activeCityName && activeMode && detailsSectionRef.current) {
      detailsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeCityName, activeMode]);

  const handleShowDetails = (data) => {
    const mappedDetails = {
      feels_like: Math.round(data.main.feels_like),
      min_temp: Math.round(data.main.temp_min),
      max_temp: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      visibility: data.visibility,
    };

    setCurrentDetailedData(mappedDetails);
    setActiveCityName(data.name);
    setActiveMode("details");
  };

  const handleShowForecast = async (cityName) => {
    setIsForecastLoading(true);
    setActiveCityName(cityName);
    setActiveMode("hourly");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      const mappedForecast = response.data.list.slice(0, 10).map((item) => {
        const date = new Date(item.dt * 1000);
        const timeString = date
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })
          .toLowerCase();

        return {
          time: timeString,
          temp: Math.round(item.main.temp),
        };
      });

      setCurrentForecastData(mappedForecast);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    } finally {
      setIsForecastLoading(false);
    }
  };

  if (loading)
    return (
      <div className={styles["weather-dashboard__loading"]}>
        Loading weather...
      </div>
    );

  return (
    <div className={styles["weather-dashboard"]}>
      <Container>
        <div className={styles["weather-dashboard__container"]}>
          {weatherData.map((data, index) => (
            <WeatherCard
              key={`${data.name}-${index}`}
              data={data}
              onRefresh={fetchWeather}
              onDelete={() => onRemoveCity(data.name)}
              onForecast={handleShowForecast}
              onDetails={handleShowDetails}
              onDaily={handleShowDaily}
            />
          ))}
        </div>

        {activeMode && (
          <div
            ref={detailsSectionRef}
            className={styles["weather-dashboard__details-section"]}
            key={activeMode}
          >
            <div className={styles["weather-dashboard__separator"]}></div>

            <h2 className={styles["weather-dashboard__section-title"]}>
              {activeMode === "hourly" && "Hourly Forecast"}
              {activeMode === "daily" && "5-Day Forecast"}
              {activeMode === "details" && "Weather Details"} for{" "}
              <span className={styles["weather-dashboard__highlight"]}>
                {activeCityName}
              </span>
            </h2>

            <div className={styles["weather-dashboard__content-wrapper"]}>
              {activeMode === "hourly" &&
                (isForecastLoading ? (
                  <div className={styles["weather-dashboard__sub-loading"]}>
                    Loading Forecast...
                  </div>
                ) : (
                  <HourlyForecast data={currentForecastData} />
                ))}

              {activeMode === "daily" &&
                (isForecastLoading ? (
                  <div className={styles["weather-dashboard__sub-loading"]}>
                    Loading Daily Forecast...
                  </div>
                ) : (
                  <DailyForecast forecast={currentDailyData} />
                ))}

              {activeMode === "details" && (
                <WeatherDetails weatherData={currentDetailedData} />
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default WeatherDashboard;
