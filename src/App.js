import "./App.css";
import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import {
  fetchCurrentLocation,
  fetchCurrentWeather,
  fetchForecast,
} from "./api";
import { useQuery } from "react-query";

function App() {
  const [searchData, setSearchData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  // Fetch location data on application start
  const { isLoading, isError } = useQuery("location", fetchCurrentLocation, {
    onSuccess: (data) => {
      setSearchData({
        value: `${data.latitude} ${data.longitude}`,
      });
    },
  });

  useQuery(
    ["currentWeather", searchData],
    () => fetchCurrentWeather(searchData),
    {
      enabled: !!searchData,
      onSuccess: setCurrentWeather,
    }
  );

  useQuery(["forecastWeather", searchData], () => fetchForecast(searchData), {
    enabled: !!searchData,
    onSuccess: setForecastWeather,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError}</div>;
  }

  const handleOnSearchChange = (searchData) => {
    console.log("searchData", searchData);
    if (searchData) {
      setSearchData(searchData);
    }
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
