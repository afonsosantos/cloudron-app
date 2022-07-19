import axios from "axios";
import { ACCESS_TOKEN } from "./config";

export default axios.create({
  baseURL: "https://my.apps.santostuff.xyz/api/v1/",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
