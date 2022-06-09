import React, { useEffect, useState } from "react";
import WeatherDetails, { weatherData } from "./WeatherDetails";
import { fetchWeather } from "../services/fetchWeather";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/Navbar.css";
import { fetchPhotos } from "../services/fetchPhotos";

const Navbar: React.FC<{
  getData: (data: any) => void;
  getImage: (data: any) => void;
  defaultData: any;
}> = ({ getData, getImage, defaultData }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<weatherData>({
    current: { cloudcover: "", humidity: 0, wind_speed: 0 },
  });
  const [image, setImage] = useState({});

  const search = async (e: any) => {
    if (e.key === "Enter") {
      const WeatherData = await fetchWeather(query);
      const ImageLocation = await fetchPhotos(query);
      setImage(ImageLocation.results);
      setWeather(WeatherData);
      setQuery("");
    }
  };

  const clickText = async (query: string) => {
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
          placeholder="Another Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        <SearchIcon className="navbar__searchIcon" />
      </div>
      <div className="navbar__cities__container">
        <div className="cities">
          <div onClick={(e) => clickText("mumbai")}>
            <h3>Mumbai</h3>
          </div>
          <div onClick={(e) => clickText("london")}>
            <h3>London</h3>
          </div>
          <div onClick={(e) => clickText("New Delhi")}>
            <h3>New Delhi</h3>
          </div>
          <div onClick={(e) => clickText("Los Angeles")}>
            <h3>Los Angeles</h3>
          </div>
        </div>
        <div className="arrange__cities"></div>
      </div>
      <WeatherDetails weather={weather} defaultData={defaultData} />
    </div>
  );
};

export default Navbar;
