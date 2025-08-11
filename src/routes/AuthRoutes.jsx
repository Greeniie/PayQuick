import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../utils/Spinner";

const AuthRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/transactions", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthRoutes;
