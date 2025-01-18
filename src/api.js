import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const cityOptions = async (inputValue) => {
  try {
    const response = await axios.get(`${GEO_API_URL}`, {
      params: {
        minPopulation: 1000000,
        namePrefix: inputValue,
      },
      ...geoApiOptions,
    });
    const options = response.data.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.city}, ${city.countryCode}`,
    }));
    return {
      options,
      hasMore: false,
    };
  } catch (error) {
    console.error(error);
    return { options: [], hasMore: false };
  }
};

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

console.log("WEATHER_API_KEY", WEATHER_API_KEY);

export const fetchCurrentWeather = async (searchData, setCurrentWeather) => {
  try {
    const [lat, lon] = searchData.value.split(" ");
    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        lat,
        lon,
        exclude: "{part}",
        units: "metric",
        appid: WEATHER_API_KEY,
      },
    });
    const currentWeatherData = response.data;
    return { city: searchData.label, ...currentWeatherData };
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
};

export const fetchForecast = async (searchData, setForecastWeather) => {
  try {
    const [lat, lon] = searchData.value.split(" ");
    const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
      params: {
        lat,
        lon,
        exclude: "{part}",
        units: "metric",
        appid: WEATHER_API_KEY,
      },
    });
    const forecastWeatherData = response.data;
    return { city: searchData.label, ...forecastWeatherData };
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
};

export const fetchCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export const fetchCurrentCity = async (searchData) => {
  const [lat, lon] = searchData.value.split(" ");
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = response.data;
    // Extract the city name from the response
    const city = data.address.city || data.address.town || data.address.village;
    return city + ", " + data.address.country_code.toUpperCase();
  } catch (error) {
    throw new Error("Error fetching current city");
  }
};
