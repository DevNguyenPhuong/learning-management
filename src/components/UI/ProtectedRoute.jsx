import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
