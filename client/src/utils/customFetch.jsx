import axios from "axios";

const url = "http://localhost:4000";

export const customFetch = axios.create({
  baseURL: url,
  withCredentials: true,
});
