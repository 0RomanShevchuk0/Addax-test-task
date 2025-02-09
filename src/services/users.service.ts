import { axiosWithAuth } from "@/api/interceptors"
import { IUser } from "@/types/user"

class UsersService {
  updateUser = async (id: string, data: Partial<IUser>) => {
    const response = await axiosWithAuth.patch(`/users/${id}`, data)
    return response
  }
}

export const usersService = new UsersService()
