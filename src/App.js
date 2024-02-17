import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useEffect, useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const defaultSearchData = { value: "50.4504 30.5245", label: "Kyiv" };
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data for default lat lon on component mount
    fetchWeatherForLocation(defaultSearchData);
  }, []);

  const handleOnSearchChange = (searchData) => {
    if (searchData) {
      fetchWeatherForLocation(searchData);
    }
    return;
  };

  const fetchWeatherForLocation = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const forecastWeatherFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${WEATHER_API_KEY}`
    );
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      <Forecast />
    </div>
  );
}

export default App;
