import axios from "axios";
import config from "../../config";
import { fetchToken } from "../../helpers/localstorage";

axios.defaults.baseURL = config.api;
axios.defaults.headers.common["Authorization"] = fetchToken();

axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});

const client = axios;

export default client;
