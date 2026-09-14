import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated =
    localStorage.getItem("auth") === "true";

  //  Not logged in → login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  //  Logged in → allow
  return children;
};

export default ProtectedRoute;
