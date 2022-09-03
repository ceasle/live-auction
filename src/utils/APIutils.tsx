import { useNavigate } from "react-router-dom";

export const isAuthenticated = () => {
  return (
    JSON.parse(localStorage.getItem("ACCESS_TOKEN_EXPIRATION") ?? "0") >
      Date.now() && localStorage.getItem("ACCESS_TOKEN")
  );
};

export const logout = () => {
  let navigate = useNavigate();
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("ACCESS_TOKEN_EXPIRATION");
  navigate("/login");
};
