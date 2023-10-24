import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
// admin pages
import Admin from "../pages/admin/Index";
import CreateAdmin from "../pages/admin/CreateAdmin";
import ListAdmin from "../pages/admin/ListAdmin";

// Layouts
import RootLayout from "../layouts/RootLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import NestedLayout from "../layouts/NestedLayouts";
import AdminDetails from "../pages/admin/AdminDetails";

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
