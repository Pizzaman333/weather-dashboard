import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import WeatherDashboard from "./Components/WeatherDashboard/WeatherDashboard";
import Hero from "./Components/Hero/Hero";
import News from "./Components/News/News";
import Slider from "./Components/Slider/Slider";
import Footer from "./Components/Footer/Footer";
import { useAuth } from "./context/AuthContext";

const DEFAULT_CITIES = ["Prague", "London", "Berlin"];

function App() {
  const { currentUser, userData } = useAuth();

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
      prevCities.filter((city) => city.toLowerCase() !== cityToRemove.toLowerCase())
    );
  };

  const handleShowFavorites = () => {
    if (userData?.likedCities && userData.likedCities.length > 0) {
      setCities(userData.likedCities);
    } else {
      alert("No favorites found or not logged in!");
    }
  };

  return (
    <div>
      <Header />
      <Hero onSearch={handleAddCity} />
     <WeatherDashboard 
        cities={cities} 
        onRemoveCity={handleRemoveCity} 
        onShowFavorites={handleShowFavorites}
        isLoggedIn={!!currentUser}
      />
      <News />
      <Slider />
      <Footer />
    </div>
  );
}

export default App;
