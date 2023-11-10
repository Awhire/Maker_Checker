import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const user = localStorage.getItem("user");
let userId: any
if (user) {
  const userObj = JSON.parse(user);
  userId = userObj.id;
}


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

  // get Admin Details
    getAdminDetails: (payload: any) => {
      const method = "get";
      const url = baseURL + "/admin/" + payload;

      return axios({ method, url });
    },

  // Update Admin
    updateAdminRole: (payload: any) => {
      const method = "put";
      const url = baseURL + "/updateRole/";

      return axios({ method, url, data: payload });
    },

    // Create Mapping
    createMapping: (payload: any) => {
      const method = "post";
      const url = baseURL + "/mapping/create";
      return axios({ method, url, data: payload });
    },

    // Get All Mapping
    getAllMapping: () => {
      const method = "get";
      const url = baseURL + "/mapping/getAllMapping";
      return axios({ method, url });
    },

    // Get All Mapping By Status
    getAllMappingByStatus: (payload: any) => {
      const method = "get";
      const url = baseURL + `/mapping/getAllMappingByStatus?status=${payload}`;
      return axios({ method, url });
    },

    // Get Mapping By Id Status
    getMappingByIdStatus: (payload: any) => {
      const method = "get";
      const url = baseURL + `/mapping/getMappingByIdStatus?admin_id=${userId}&status=${payload}`;
      return axios({ method, url });
    },

     // Approve/Reject Admin Mapping
     approveAdminMapping: (payload: any) => {
      const method = "post";
      const url = baseURL + "/mapping/approve";
      return axios({ method, url, data: payload });
    },

     // Create Request
     createRequest: (payload: any) => {
      const method = "post";
      const url = baseURL + "/request/create";
      return axios({ method, url, data: payload });
    },

     // Create Request
     approveRequest: (payload: any) => {
      const method = "post";
      const url = baseURL + "/request/approve";
      return axios({ method, url, data: payload });
    },

     // Create Request
     declineRequest: (payload: any) => {
      const method = "post";
      const url = baseURL + "/request/decline";
      return axios({ method, url, data: payload });
    },

     // Get All Request
     getAllRequest: () => {
      const method = "get";
      const url = baseURL + "/requests";
      return axios({ method, url });
    },

     // Get All Request
     getAllRequestByStatus: (payload: any) => {
      const method = "get";
      const url = baseURL + `/requests/getRequestbyStatus/?status=${payload}`;
      return axios({ method, url });
    },

     // Get All Users Profile
     getAllUsersProfile: () => {
      const method = "get";
      const url = baseURL + "/usersProfile";
      return axios({ method, url });
    },
};

export default endpoints;
