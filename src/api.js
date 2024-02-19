import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "03531e4774mshc97d75550a5d7d6p1d3136jsn2b02678ced8f",
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
export const WEATHER_API_KEY = "a9c5f47a2a143ab0745e760d11f4c41c";

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
