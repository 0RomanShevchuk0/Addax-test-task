import { appQueries } from "@/configs/querues.config"
import { usersService } from "@/services/users.service"
import { IUser } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IUser> }) =>
      usersService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.user] })
    },
    onError: (error) => {
      console.error("Error updating user:", error)
    },
  })
}

export const useUploadUserAvatar = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ file }: { file: File }) => usersService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.user] })
    },
    onError: (error) => {
      console.error("Error uploading user avatar:", error)
    },
  })
}
