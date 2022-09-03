export const isAuthenticated = () => {
  return (
    JSON.parse(localStorage.getItem("ACCESS_TOKEN_EXPIRATION") ?? "0") >
      Date.now() && localStorage.getItem("ACCESS_TOKEN")
  );
};
