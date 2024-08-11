import axios from "axios"
// const dotenv = require("dotenv")
// console.log(process.env.REACT_APP_BACKEND_URL)
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
const api = axios.create({
  baseURL: "https://backend-ygez.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})
export default api
