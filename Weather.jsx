import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import { WeatherAPI } from "../apiConfig.jsx";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // grab today's date
      const today = new Date();

      // based off Las Vegas location + PST time zone
      const params = {
        latitude: 36.175,
        longitude: -115.1372,
        current: "temperature_2m",
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_probability_max",
        ],
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timezone: "America/Los_Angeles",
        past_days: 0,
        forecast_days: 5, // setting to 5 includes today + next 4 days
      };
      // receive response from openmeteo api
      const responses = await fetchWeatherApi(WeatherAPI, params);

      // process 1st location(only location, set to vegas); response from openmeteo must be dereferenced
      const response = responses[0];

      // helper function to form time ranges
      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, i) => start + i * step
        );

      // attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();

      // current and daily info
      const current = response.current();
      const daily = response.daily();

      // Note: The order of weather variables in the URL query and the indices below need to match!
      // object to send to weather data state
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: Math.round(current.variables(0)?.value()),
        },
        daily: {
          time: range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          )
            .map((t) => new Date((t + utcOffsetSeconds) * 1000))
            .slice(0, daily.variables(0)?.valuesArray().length),
          temperature2mMax: daily.variables(0)?.valuesArray().map(Math.round),
          temperature2mMin: daily.variables(1)?.valuesArray().map(Math.round),
          precipitationProbabilityMax: daily.variables(2)?.valuesArray(),
        },
      };

      // these filter functions filter out all the previous days received from the api
      const filteredTime = weatherData.daily.time.filter(
        (time) => new Date(time) >= today
      );

      const filteredTemperature2mMax =
        weatherData.daily.temperature2mMax.filter(
          (_, i) => new Date(weatherData.daily.time[i]) >= today
        );

      const filteredTemperature2mMin =
        weatherData.daily.temperature2mMin.filter(
          (_, i) => new Date(weatherData.daily.time[i]) >= today
        );

      const filteredPrecipitationProbabilityMax =
        weatherData.daily.precipitationProbabilityMax.filter(
          (_, i) => new Date(weatherData.daily.time[i]) >= today
        );

      // set weather data state, prop pass everything from weatherData except for filtered values
      setWeatherData({
        ...weatherData,
        daily: {
          ...weatherData.daily,
          time: filteredTime,
          temperature2mMax: filteredTemperature2mMax,
          temperature2mMin: filteredTemperature2mMin,
          precipitationProbabilityMax: filteredPrecipitationProbabilityMax,
        },
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Current Day's Weather Conditions */}
      {weatherData &&
        (() => {
          // grab today's date
          const today = new Date().setHours(0, 0, 0, 0);

          // find the index of today in the daily.time array
          const currentIndex = weatherData.daily.time.findIndex(
            (time) => new Date(time).setHours(0, 0, 0, 0) === today
          );

          return (
            <div>
              <h2>Current Weather:</h2>
              <p>
                {new Date(weatherData.current.time).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
              <p>Temperature: {weatherData.current.temperature2m}&deg;</p>
              <p>
                Max Temp: {weatherData.daily.temperature2mMax[currentIndex]}
                &deg;
              </p>
              <p>
                Min Temp: {weatherData.daily.temperature2mMin[currentIndex]}
                &deg;
              </p>
              {/* NOTE: USE THIS FOR ANIMATIONS <p>Rain Chance: {weatherData.daily.precipitationProbabilityMax[0]}</p> */}
            </div>
          );
        })()}
      {/* Weather Conditions for Next 4 Days */}
      {weatherData &&
        weatherData.daily.time.map((time, i) => (
          <div key={i}>
            <h2>Daily Weather:</h2>
            <p>
              {new Date(time).toLocaleDateString("en-US", {
                weekday: "long",
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>Max Temperature: {weatherData.daily.temperature2mMax[i]}&deg;</p>
            <p>Min Temperature: {weatherData.daily.temperature2mMin[i]}&deg;</p>
            {/* <p>
              Rain Chance: {weatherData.daily.precipitationProbabilityMax[i]}
            </p> */}
          </div>
        ))}
    </>
  );
};

export default Weather;
