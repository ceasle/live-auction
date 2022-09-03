import { useNavigate } from "react-router-dom";
import Cryptr from "cryptr";

export const isAuthenticated = () => {
  return (
    JSON.parse(getItem("ACCESS_TOKEN_EXPIRATION") ?? "0") > Date.now() &&
    localStorage.getItem("ACCESS_TOKEN")
  );
};

export const logout = () => {
  let navigate = useNavigate();
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("ACCESS_TOKEN_EXPIRATION");
  navigate("/login");
};

const cryptr = new Cryptr(process.env.REACT_APP_SECRET_KEY ?? "");

export const setItem = (key: string, value: string) => {
  const EncryptedToken = cryptr.encrypt(value);
  localStorage.setItem(key, EncryptedToken);
};

export const getItem = (key: string) => {
  const EncryptedToken = localStorage.getItem(key);
  if (EncryptedToken === null) return null;
  const DecryptedToken = cryptr.decrypt(EncryptedToken ?? "");
  return DecryptedToken ?? "";
};
