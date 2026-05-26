import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";
import Hero from "./Components/Hero/Hero";
import News from "./Components/News/News";
import Slider from "./Components/Slider/Slider";
import Footer from "./Components/Footer/Footer";
// import WeatherDetails from "./Components/WeatherDetails/WeatherDetails";
// import HourlyForecast from "./Components/HourlyForecast/HourlyForecast";

const DEFAULT_CITIES = ["Prague", "London", "Berlin"];

function App() {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("weather_cities");
    return savedCities ? JSON.parse(savedCities) : DEFAULT_CITIES;
  });

  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cities));
  }, [cities]);

  const handleAddCity = (newCityName) => {
    if (cities.includes(newCityName)) {
      alert("City already exists!");
      return;
    }
    setCities((prevCities) => [...prevCities, newCityName]);
  };

  const handleRemoveCity = (cityToRemove) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };
//   const detailedData = {
//   feels_like: 29.2,
//   min_temp: 27.9,
//   max_temp: 27.9,
//   humidity: 59,
//   pressure: 1007,
//   wind_speed: 3.17,
//   visibility: 10000 
// };

// const forecastData = [
//   { time: "11 pm", temp: 14 },
//   { time: "Oct 14", temp: 13 }, 
//   { time: "1 am", temp: 12 },
//   { time: "2 am", temp: 11 },
//   { time: "3 am", temp: 10.5 },
//   { time: "4 am", temp: 10.8 },
//   { time: "5 am", temp: 11.5 },
//   { time: "6 am", temp: 12.2 },
//   { time: "7 am", temp: 13 },
//   { time: "8 am", temp: 13.8 },
//   { time: "9 am", temp: 15 },
//   { time: "10 am", temp: 16.5 },
//   { time: "11 am", temp: 17.8 },
//   { time: "12 am", temp: 18.5 },
//   { time: "1 pm", temp: 19.5 },
//   { time: "2 pm", temp: 21 },
//   { time: "3 pm", temp: 23 },
//   { time: "4 pm", temp: 24.5 },
//   { time: "5 pm", temp: 25.2 },
//   { time: "6 pm", temp: 25.5 },
// ];


  return (
    <div>
      <Header />
      <Hero onSearch={handleAddCity} />
      <WeatherDashboard cities={cities} onRemoveCity={handleRemoveCity} />
{/* <WeatherDetails weatherData={detailedData} />
<HourlyForecast data={forecastData} /> */}
      <News />
      <Slider />
      <Footer />
    </div>
  );
}

export default App;
