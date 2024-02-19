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

  return (
    <div className="forecast">
      <label className="title">Daily forecast:</label>
      <Accordion allowZeroExpanded>
        {filteredListDay.map((item, index) => {
          const iconName = item.weather[0].icon;
          const dayIconName = iconName.slice(0, -1) + "d";
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${dayIconName}.png`}
                    />
                    <label className="day">{forecastWeekDays[index]}</label>
                    <label className="description">
                      {item.weather[0].main}
                    </label>
                    <label className="day-night">
                      {Math.round(item.main.temp)}°{" / "}
                      <span className="night">
                        {Math.round(filteredListNight[index].main.temp)}°
                      </span>
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{Math.round(item.main.feels_like)}°</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Forecast;
