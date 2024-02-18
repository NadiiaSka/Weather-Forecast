import "./forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastWeekDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const list = data.list;
  // Free api version returns 5 day/3hr forecast
  // so, need to filter it
  // Function to check if a date is after tomorrow
  const isAfterTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
    tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const date = new Date(dateString);
    return date >= tomorrow;
  };

  // Filter the list
  const filteredListDay = list.filter((item) => {
    const dateTime = new Date(item.dt_txt);
    const time = dateTime.getHours();

    // Check if the date is after tomorrow and time is 12:00:00
    return isAfterTomorrow(item.dt_txt) && time === 12;
  });

  // Filter the list
  const filteredListNight = list.filter((item) => {
    const dateTime = new Date(item.dt_txt);
    const time = dateTime.getHours();

    // Check if the date is after tomorrow and time is 00:00:00
    return isAfterTomorrow(item.dt_txt) && time === 0;
  });

  // Get geolocation from the browser
  // if ("geolocation" in navigator) {
  //   // Get the user's current position
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     console.log("Latitude:", latitude);
  //     console.log("Longitude:", longitude);
  //   });
  // } else {
  //   console.log("Geolocation is not supported by this browser.");
  // }

  return (
    <>
      <label className="title">Daily forecast:</label>
      <Accordion allowZeroExpanded>
        {filteredListDay.map((item, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className="day">{forecastWeekDays[index]}</label>
                    <label className="description">
                      {item.weather[0].main}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp)}°C /
                      {Math.round(filteredListNight[index].main.temp)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p></p>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
