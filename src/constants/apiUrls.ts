const devMode = false;

export const BASE_PAGE_URL = devMode
  ? "http://localhost:8080"
  : "https://auction36.herokuapp.com";
export const HOME_PAGE_URL = BASE_PAGE_URL + "/";
export const CREATE_PAGE_URL = BASE_PAGE_URL + "/create";
export const AUCTION_PAGE_URL = BASE_PAGE_URL + "/auction";
