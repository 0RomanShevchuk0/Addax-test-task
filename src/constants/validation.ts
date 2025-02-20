export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

export const EMAIL_PATTERN = {
  value: EMAIL_REGEX,
  message: "Invalid email format",
}

export const IMAGE_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"]
export const FILE_MAX_SIZE = 5 * 1024 * 1024 // 5 MB
