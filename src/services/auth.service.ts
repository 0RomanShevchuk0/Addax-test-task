import { axiosClassic, axiosWithAuth } from "../api/config"
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
    const response = await axiosClassic.post<IAuthResponse>(`${this.base}login/access-token`)

    if (response.data.accessToken) authTokenService.saveTokenStorage(response.data.accessToken)

    return response
  }

  logout = async () => {
    const response = await axiosClassic.post<boolean>(`${this.base}}/logout`)

    if (response.data) authTokenService.removeFromStorage()

    return response
  }

  getUserFromToken = async () => {
    const response = await axiosWithAuth.get<{ user: IUser }>(`${this.base}/me`)
    return response.data
  }
}

export const authService = new AuthService()
