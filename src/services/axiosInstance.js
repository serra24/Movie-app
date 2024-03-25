
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: "dc186421333d8ad36f1a654387701e25",
  };
  return config;
});

export default instance;

