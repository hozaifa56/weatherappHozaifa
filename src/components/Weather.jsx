import React, { useEffect, useState } from 'react';
import './css/style.css'; // Make sure the path to your CSS file is correct
import wea from '/wea.gif'; // Provide the correct relative path to your image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';

const apiKey = '3ed0053641464e6eca6ec551dd84bb0b'; // Replace with your OpenWeatherMap API key

export default function Weather() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Mumbai');

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };

    fetchApi();
  }, [search]);

  return (
    <div className="data">
      <div className="card my-5" style={{ width: "28rem" }}>
        <img src={wea} className="card-img-top" alt="..." />
        <div className="card-body">
          <h2 className="card-title text-center">Weather App By Hozaifa</h2>
          <p className="card-text text-center">
            <FontAwesomeIcon style={{ fontSize: 'xx-large' }} icon={faStreetView} />
            <b className="fs-5"> Location: </b>
            <input type="search" onChange={(event) => { setSearch(event.target.value) }} />
          </p>
          {city && (
            <div>
              <p className="card-text text-center"><b>Temperature:</b> {city.temp}°C</p>
              <p className="card-text text-center"><b>Feels Like:</b> {city.feels_like}°C</p>
              <p className="card-text text-center"><b>Humidity:</b> {city.humidity}%</p>
              <p className="card-text d-flex justify-content-evenly">
                <span><b>Max:</b> {city.temp_max}°C</span>
                <span><b>Min:</b> {city.temp_min}°C</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
