import Cookies from "js-cookie"

export enum EnumTokens {
  "ACCESS_TOKEN" = "accessToken",
  "REFRESH_TOKEN" = "refreshToken",
}

class AuthTokenService {
  getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
  }

  saveTokenStorage = (accessToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, { expires: 2 })
  }

  removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
  }
}

export const authTokenService = new AuthTokenService()
