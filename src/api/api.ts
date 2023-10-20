import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const endpoints = {
  signIn: (payload: any) => {
    const method = "post";
    const url = baseURL + "/login";
    return axios({ method, url, data: payload });
  },

  signOut: () => {
    console.log('token', token)
    const method = "post";
    const url = baseURL + "/logout";

    return axios({ method, url});
  },

  // get userlist endpoint
  //   getUersData: () => {
  //     const method = "get";
  //     const url = baseURL + "/eefab29f-f880-43cb-9d0d-9d3f74d8bb8b";

  //     return axios({ method, url });
  //   },
};

export default endpoints;
