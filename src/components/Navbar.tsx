import React, { useEffect, useState } from "react";
import WeatherDetails from "./WeatherDetails";
import { fetchWeather } from "../services/fetchWeather";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/Navbar.css";
import { fetchPhotos } from "../services/fetchPhotos";

function Navbar(getData: any, getImage: any, defaultData: any) {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [image, setImage] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const WeatherData = await fetchWeather(query);
      const ImageLocation = await fetchPhotos(query);
      setImage(ImageLocation.results);
      setWeather(WeatherData);
      setQuery("");
    }
  };

  const clickText = async (query: any) => {
    const WeatherData = await fetchWeather(query);
    const ImageLocation = await fetchPhotos(query);
    setImage(ImageLocation.results);
    setWeather(WeatherData);
    setQuery("");
  };

  useEffect(() => {
    getImage(image);
    getData(weather);
  }, [getData, getImage, image, weather]);

  return (
    <div className="weather__navbar">
      <div className="weather__input__container">
        <Input
          className="navbar__input"
          color="#ffffff"
          placeholder="Another Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        <SearchIcon className="navbar__searchIcon" />
      </div>
      <div className="navbar__cities__container">
        <div className="cities">
          <h3 onClick={(e) => clickText(e.target.textContent)}>Mumbai</h3>
          <h3 onClick={(e) => clickText(e.target.textContent)}>London</h3>
          <h3 onClick={(e) => clickText(e.target.textContent)}>New Delhi</h3>
          <h3 onClick={(e) => clickText(e.target.textContent)}>Los Angeles</h3>
        </div>
        <div className="arrange__cities"></div>
      </div>
      <WeatherDetails weather={weather} defaultData={defaultData} />
    </div>
  );
}

export default Navbar;
