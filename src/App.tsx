import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Weather, { data } from "./components/Weather";
import { fetchPhotos } from "./services/fetchPhotos";
import { fetchWeather } from "./services/fetchWeather";
import "./styles/App.css";

type imageData = {
  urls: { full: string };
};

function App() {
  const [data, setData] = useState<data>({
    current: { temperature: 32, weather_icons: "", weather_descriptions: [""] },
    location: { name: "", localtime: 0 },
  });
  const [image, setImage] = useState<imageData[]>([]);
  const [defaultImage, setDefaultImage] = useState<imageData[]>([]);
  const [defaultData, setDefaultData] = useState({
    current: { temperature: 32, weather_icons: "", weather_descriptions: [""] },
    location: { name: "", localtime: 0 },
  });

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

  const backgroundImageLink: string =
    image.length > 1
      ? image[0]
        ? image[Math.floor(Math.random() * 10)]?.urls?.full
        : defaultImage[Math.floor(Math.random() * 10)]?.urls?.full
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
