import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/search/search";
import GetCurrentLocation from "./components/search/GetCurrentLocation";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { useQuery } from "react-query";
import { fetchCurrentWeather, fetchForecast } from "./api";

function App() {
  const defaultSearchData = { value: "50.4504 30.5245", label: "Kyiv" };
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    fetchCurrentWeather(defaultSearchData, setCurrentWeather);
    fetchForecast(defaultSearchData, setForecastWeather);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnSearchChange = (searchData) => {
    if (searchData) {
      fetchCurrentWeather(searchData, setCurrentWeather);
      fetchForecast(searchData, setForecastWeather);
    }
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
      {<GetCurrentLocation />}
    </div>
  );
}

export default App;
