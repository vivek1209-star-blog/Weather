import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import { fetchPhotos } from "./services/fetchPhotos";
import { fetchWeather } from "./services/fetchWeather";
import "./styles/App.css";

function App() {
  const [data, setData] = useState({});
  const [image, setImage] = useState({});
  const [defaultImage, setDefaultImage] = useState({});
  const [defaultData, setDefaultData] = useState({});

  const getDefault = async () => {
    const WeatherData = await fetchWeather("London");
    setDefaultData(WeatherData);
  };

  const getDefaultImage = async () => {
    const preImage = await fetchPhotos("London");
    setDefaultImage(preImage.results);
  };

  useEffect(() => {
    getDefault();
    getDefaultImage();
  }, []);
  const getData = (data: any) => {
    setData(data);
  };

  const getImage = (data: any) => {
    setImage(data);
  };
  const backgroundImageLink = image[0]
    ? image[Math.floor(Math.random() * 10)]?.urls?.full
    : defaultImage[Math.floor(Math.random() * 10)]?.urls?.full;
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImageLink})`,
      }}
    >
      <Weather data={data} defaultData={defaultData} />
      <Navbar getData={getData} getImage={getImage} defaultData={defaultData} />
    </div>
  );
}

export default App;
