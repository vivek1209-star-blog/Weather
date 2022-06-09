import React from "react";
import "../styles/Weather.css";

export interface data {
  current: {
    temperature: number;
    weather_icons: string;
    weather_descriptions: string[];
  };
  location: { name: string; localtime: number };
}
export interface defaultData {
  current: {
    temperature: number;
    weather_icons: string;
    weather_descriptions: string[];
  };
  location: { name: string; localtime: number };
}

const Weather: React.FC<{
  data: data;
  defaultData: defaultData;
}> = ({ data, defaultData }) => {
  const dataDesc =
    Array.isArray(data.current?.weather_descriptions) &&
    data.current?.weather_descriptions.length > 0
      ? data.current?.weather_descriptions[0]
      : "";
  const defaultDesc =
    Array.isArray(defaultData.current?.weather_descriptions) &&
    defaultData.current?.weather_descriptions.length > 0
      ? defaultData.current?.weather_descriptions[0]
      : "";
  return (
    <div className="weather__container">
      <div className="the__weather__section">
        <div className="the__weather__title">
          <h4>the.weather</h4>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="weather__info">
        <span></span>
        <div className="weather__degree">
          <h1>
            {data.current
              ? data?.current?.temperature
              : defaultData.current?.temperature}
            <sup>°</sup>
          </h1>
        </div>
        <div className="weather__city">
          <h1>
            {data.location ? data.location?.name : defaultData.location?.name}
          </h1>
          <sub>
            {data.location
              ? data.location?.localtime
              : defaultData.location?.localtime}
          </sub>
        </div>
        {}
        <div className="weather__logo">
          <img src={data?.current?.weather_icons} alt="icon" />
          <sub>{data.current ? dataDesc : defaultDesc}</sub>
        </div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Weather;
