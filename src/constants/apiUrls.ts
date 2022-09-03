const devMode = true;

export const BASE_PAGE_URL = devMode
  ? "http://localhost:8080"
  : "https://auction36.herokuapp.com";

export const DEFAULT_PAGE_URL = BASE_PAGE_URL + "/";
export const HOME_PAGE_URL = BASE_PAGE_URL + "/home";
export const CREATE_PAGE_URL = BASE_PAGE_URL + "/create";
export const AUCTION_PAGE_URL = BASE_PAGE_URL + "/auction";
export const JOIN_PAGE_URL = BASE_PAGE_URL + "/join";
export const LOGIN_PAGE_URL = BASE_PAGE_URL + "/login";
