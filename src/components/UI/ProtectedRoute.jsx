import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, navigate, dispatch]
  );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
