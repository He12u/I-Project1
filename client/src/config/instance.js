import axios from "axios";

// const baseURL = "https://api-social-app.papazap.biz.id";
const baseURL = "http://localhost:3000";

const instanceURL = axios.create({
  baseURL,
});

export default instanceURL;
