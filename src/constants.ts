export const TOKEN_NAME = "challenge-token";

export const SERVER_URI =
  process.env.NODE_ENV === "production"
    ? "https://nodcast.herokuapp.com"
    : "http://localhost:4000";

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

export const EPISODE_FORM = {
  FILE_REQUIRED_ERR: "Audio file is required",
  TITLE_REQUIRED_ERR: "Title is required",
  TITLE_MAX_LENGTH: 50,
  TITLE_MAX_LENGTH_ERR: "Title is too long",
  DESC_MAX_LENGTH: 1000,
  DESC_MAX_LENGTH_ERR: `Description is too long`,
};
