import { axiosClassic, axiosWithAuth } from "../api/interceptors"
import { IAuthResponse, IAuthForm } from "../types/auth"
import { IUser } from "../types/user"
import { authTokenService } from "./auth-token.service"

class AuthService {
  private base = "/auth"

  login = async (data: IAuthForm) => {
    const response = await axiosClassic.post<IAuthResponse>(`${this.base}/login`, data)

    if (response.data.accessToken) authTokenService.saveTokenStorage(response.data.accessToken)

    return response
  }

  register = async (data: IAuthForm) => {
    const response = await axiosClassic.post<IAuthResponse>(`${this.base}/register`, data)

    if (response.data.accessToken) authTokenService.saveTokenStorage(response.data.accessToken)

    return response
  }

  getNewTokens = async () => {
    const response = await axiosClassic.get<IAuthResponse>(`${this.base}/access-token`)
    if (response.data.accessToken) authTokenService.saveTokenStorage(response.data.accessToken)

    return response
  }

  logout = async () => {
    await axiosWithAuth.post(`${this.base}/logout`)
    authTokenService.removeFromStorage()
    window.location.reload()
  }

  getUserFromToken = async () => {
    const response = await axiosWithAuth.get<{ user: IUser }>(`${this.base}/me`)
    return response.data
  }
}

export const authService = new AuthService()
