export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

export const EMAIL_PATTERN = {
  value: EMAIL_REGEX,
  message: "Invalid email format",
}
