import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Transactions from "./Pages/Transactions.jsx";
import AuthRoutes from "./routes/AuthRoutes.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";

const Login = lazy(() => import("./pages/Auth/Login.jsx"));

const Loading = () => {
  return (
    <div className="spin">
      <Spin />
    </div>
  );
};
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Private Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}


export default App;
