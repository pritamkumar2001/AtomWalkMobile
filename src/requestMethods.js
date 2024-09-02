import axios from "axios";
import { endpoint } from "./constants";

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.key;

export const publicRequest = axios.create({
  baseURL: endpoint,
});

// export const userRequest = axios.create({
//   baseURL: endpoint,
//  header: { token: `Bearer ${TOKEN}` },
// });