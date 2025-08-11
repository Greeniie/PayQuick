import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../utils/Spinner";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);


  const Loading = () => {
    return (
      <div>
        <Spinner />
      </div>
    );
  };

  return isLoggedIn ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
