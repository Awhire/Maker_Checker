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

  createAccount: (payload: any) => {
    const method = "post";
    const url = baseURL + "/create";

    return axios({ method, url, data: payload});
  },

  // get Adminlist endpoint
    getAdminData: () => {
      const method = "get";
      const url = baseURL + "/admins";

      return axios({ method, url });
    },
};

export default endpoints;
