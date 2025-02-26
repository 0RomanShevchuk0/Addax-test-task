import { authTokenService } from "@/services/auth-token.service"
import axios, { type CreateAxiosDefaults } from "axios"
import { authService } from "@/services/auth.service"

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

    console.log(" originalRequest.url:", originalRequest.url)
    if (
      (error.response.status === 401 && originalRequest.url.includes("access-token")) ||
      originalRequest.url.includes("logout")
    ) {
      console.log("includes access-token or logout, throw error!!!")
      return Promise.reject(error)
    }

    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        console.log("refresh tokens")
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        console.log("removeFromStorage and logout")
        await authService.logout()
        authTokenService.removeFromStorage()
      }
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }
