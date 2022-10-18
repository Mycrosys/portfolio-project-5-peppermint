import axios from "axios";

// This connects to the QA-API I created and fetch,
// create and/or update Data

axios.defaults.baseURL = 'https://peppermint-qa-api.herokuapp.com/';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
