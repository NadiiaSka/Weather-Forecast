import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function App() {
  const defaultSearchData = { value: "50.4504 30.5245", label: "Kyiv" };
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    fetchWeather(defaultSearchData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchWeather = async (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${WEATHER_API_KEY}`
        ),
        fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${WEATHER_API_KEY}`
        ),
      ]);
      const [currentWeatherData, forecastWeatherData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
      ]);
      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecastWeather({ city: searchData.label, ...forecastWeatherData });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  console.log(forecastWeather);

  const handleOnSearchChange = (searchData) => {
    if (searchData) {
      fetchWeather(searchData);
    }
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
