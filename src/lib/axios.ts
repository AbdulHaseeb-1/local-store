import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://local-store-phi.vercel.app/api",
});

export default axios;
