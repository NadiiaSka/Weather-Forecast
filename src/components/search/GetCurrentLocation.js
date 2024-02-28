import React from "react";
import { useQuery } from "react-query";
import { fetchCurrentLocation } from "../../api.js";

const GetCurrentLocation = () => {
  const {
    data: location,
    isLoading,
    isError,
  } = useQuery("location", fetchCurrentLocation);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div>
      <h2>Your Location:</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default GetCurrentLocation;
