import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


const endpoints = {
  // singin endpoing
  signIn: (payload: any) => {
    const method = "post";
    const url = baseURL + "/login";

    return axios({ method, url, data: payload });
  },

  // get userlist endpoint
  getUersData: () => {
    const method = "get";
    const url = baseURL + "/eefab29f-f880-43cb-9d0d-9d3f74d8bb8b";

    return axios({ method, url });
  },

  // get Details endpoint
  getUerDetails: (payload: string) => {
    const method = "get";
    const url = baseURL + "/eefab29f-f880-43cb-9d0d-9d3f74d8bb8b/" + payload;

    return axios({ method, url });
  },

  // activate user endpoint
  activateUser: (payload: string) => {
    const method = "post";
    const url = baseURL + "/68c214f8-5985-4983-81cd-adb21caf4f7a/" + payload;
    return axios({ method, url });
  },

  // blackList user endpoint
  blaclListUser: (payload: string) => {
    const method = "post";
    const url = baseURL + "/67411114-7501-444d-ac62-03e6ef75f479/" + payload;

    return axios({ method, url });
  },
};


export default endpoints;