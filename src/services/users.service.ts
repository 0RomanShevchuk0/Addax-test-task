import { axiosWithAuth } from "@/api/interceptors"
import { IUser } from "@/types/user"

class UsersService {
  private base = "/users"

  updateUser = async (id: string, data: Partial<IUser>) => {
    const response = await axiosWithAuth.patch(`${this.base}/${id}`, data)
    return response
  }

  uploadAvatar = async (avatar: File) => {
    const formData = new FormData()
    formData.set("avatar", avatar)

    const response = await axiosWithAuth.post(`${this.base}/upload-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response
  }
}

export const usersService = new UsersService()
