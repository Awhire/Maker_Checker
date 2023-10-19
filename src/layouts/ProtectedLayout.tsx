import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />
};

export default ProtectedLayout;
