import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && location.pathname === "/login") {
      navigate("/");
    }
  }, [navigate, location]);

  return null;
};

export default AuthCheck;