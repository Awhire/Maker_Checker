import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


// Layouts
import RootLayout from "../layouts/RootLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import NestedLayout from "../layouts/NestedLayouts";
import MappingLayout from "../layouts/MappingLayout"
import RequestLayout from "../layouts/RequestLayout";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
// admin pages
import Admin from "../pages/admin";
import CreateAdmin from "../pages/admin/CreateAdmin";
import ListAdmin from "../pages/admin/ListAdmin";
import AdminDetails from "../pages/admin/AdminDetails";

// Mapping Pages
import Mapping from "../pages/mapping";
import CreateMapping from "../pages/mapping/CreateMapping";
import ApproveRequest from "../pages/request/ApproveRequest";
import DeclineRequest from "../pages/request/DeclineRequest";

// Request Pages
import Request from "../pages/request";
import CreateRequest from "../pages/request/CreateRequest";
import AllRequest from "../pages/request/AllRequest";
import AllMapping from "../pages/mapping/AllMapping";
import ViewMapping from "../pages/mapping/ViewMapping";
import RequestDetails from "../pages/request/RequestDetails";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />

      {/* Proteted layout for login routes */}
      <Route element={<ProtectedLayout />}>
        {/* dashboard layout for views with sidebar and topbar */}
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="create" element={<CreateAdmin />} />

            <Route path="list" element={<NestedLayout />}>
              <Route index element={<ListAdmin />} />
              <Route path="details" element={<AdminDetails />} />
            </Route>
          </Route>
          
          <Route path="mapping" element={<MappingLayout />} >
            <Route index element={<Mapping />} />
            <Route path="create" element={<CreateMapping />} />
            <Route path="allmapping" element={<AllMapping />} />
            <Route path="viewmapping" element={<ViewMapping />} />
          </Route>
          
          <Route path="request" element={<RequestLayout />} >
            <Route index element={<Request />} />
            <Route path="create" element={<CreateRequest />} />
            <Route path="allrequest" element={<NestedLayout />} > 
              <Route index element={<AllRequest />} /> 
              <Route path="details" element={<RequestDetails />} /> 
            </Route>
            <Route path="approve" element={<ApproveRequest />} />
            <Route path="decline" element={<DeclineRequest />} />
          </Route>


        </Route>
      </Route>

      {/* 404 Not found */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
