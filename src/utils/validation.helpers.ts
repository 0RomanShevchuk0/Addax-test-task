import { FILE_MAX_SIZE, IMAGE_FILE_TYPES } from "@/constants/validation"
import { Validate } from "react-hook-form"

export const validateImageFile =
  <T>(): Validate<FileList | null, T> =>
  (fileList) => {
    if (!fileList?.length) return "File is required"

    const file = fileList[0]
    if (!IMAGE_FILE_TYPES.includes(file.type)) return "Allowed file types: JPG, PNG, WEBP"
    if (file.size > FILE_MAX_SIZE) return "File size must be less than 5MB"

    return true
  }
