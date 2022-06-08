import axios from "axios";

const URL = "http://api.weatherstack.com/current";
const API_KEY = "2f6e0dd7879c33a7acd0f7d5b87a61a6";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      query: query,
      units: "m",
      access_key: API_KEY,
    },
  });
  return data;
};
