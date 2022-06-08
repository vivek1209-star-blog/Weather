import axios from "axios";

const URL = "https://api.unsplash.com/search/photos";
const API_KEY = "98Dh3tA-szpqW6ECiblmH_raxIP8MPx9ET8Ye6qnx8M";

export const fetchPhotos = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      query: query,
      client_id: API_KEY,
    },
  });
  return data;
};
