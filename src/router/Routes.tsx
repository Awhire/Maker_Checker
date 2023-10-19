import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";


// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";


// Layouts
import RootLayout from "../layouts/RootLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import DashboardLayout from "../layouts/DashboardLayout";



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
  
        {/* Proteted layout for login routes */}
        <Route element={<ProtectedLayout />}>
          
          {/* dashboard layout for views with sidebar and topbar */}
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />           
            <Route path="admin" element={<Admin />} />           
          </Route>

        </Route>
  
        {/* 404 Not found */}
        <Route path="*" element={<NotFound />} />
  
      </Route>
    )
  );


const Routes = () => {
  return <RouterProvider router={router} />
  
}

export default Routes
