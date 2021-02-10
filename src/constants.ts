export const TOKEN_NAME = "challenge-token";

// export const SERVER_URI = "https://nodcast.herokuapp.com/graphql";
export const SERVER_URI = "http://localhost:4000/graphql";

export const NICO_URL =
  "https://www.filepicker.io/api/file/BoxcB3m3TgmVXxoomCAv";

export const LYNN_URL =
  "https://ca.slack-edge.com/T60TDKNJK-U61C8JJHK-9a572b04bf5f-72";

export const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1358&q=80";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASS_MIN_LENGTH = 6;

export const AUTH_FORM = {
  EMAIL_INVALID_ERR: "Invalid email",
  EMAIL_REQUIRED_ERR: "Email field is required",
  USERNAME_MAX_LENGTH: 50,
  USERNAME_MAX_LENGTH_ERR: "Username is too long",
  USERNAME_REQUIRED_ERR: "Username is required",
  PASS_REQUIRED_ERR: "Password field is required",
  PASS_MIN_LENGTH,
  PASS_MIN_LENGTH_ERR: `Minimum password length is ${PASS_MIN_LENGTH}`,
  CHECK_PASS_INVALID_ERR: "Passwords does not match",
  CHECK_PASS_REQUIRED_ERR: "Check password field is required",
};

export const REVIEW_MAX_LENGTH = 1000;

export const MAX_RATING = 5;

export const PODCAST_FORM = {
  TITLE_REQUIRED_ERR: "Title is required",
  TITLE_MAX_LENGTH: 50,
  TITLE_MAX_LENGTH_ERR: "Title is too long",
  PODCAST_DESC_MAX_LENGTH: 1000,
  PODCAST_DESC_MAX_LENGTH_ERR: `Description is too long`,
};
