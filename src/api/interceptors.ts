import { authTokenService } from "@/services/auth-token.service"
import axios, { type CreateAxiosDefaults } from "axios"
import { authService } from "@/services/auth.service"
import { errorCatch } from "./errorCatch"

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = authTokenService.getAccessToken()

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    const errorMessage = errorCatch(error)
    if (
      ((error?.response?.status === 401 && errorMessage.includes("expired jwt")) ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === "Refresh token expired") {
          await authService.logout()
        }
      }
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }
