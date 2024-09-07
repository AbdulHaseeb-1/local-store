import Axios from "axios";

const axios = Axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://local-store-kappa.vercel.app/api",
});

export default axios;
