import axios from "axios";

const api = axios.create({
  baseURL: "https://trainees-2022-todo-api-week-3.herokuapp.com/"
})

export default api;