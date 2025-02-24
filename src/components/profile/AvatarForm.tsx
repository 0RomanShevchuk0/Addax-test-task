import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import FormField from "../ui/FormField"
import Button from "../ui/Button"
import { validateImageFile } from "@/utils/validation.helpers"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { useUploadUserAvatar } from "@/hooks/useUserMutation"

type AvatarFormType = {
  fileList: FileList | null
}

const AvatarForm: FC = () => {
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvatarFormType>({ values: { fileList: null } })

  const uploadAvatarMutation = useUploadUserAvatar()

  const updateAvatar: SubmitHandler<AvatarFormType> = (data) => {
    if (!user) {
      return toast.error("User not found")
    }

    if (!data.fileList) {
      return toast.error("File not found")
    }

    uploadAvatarMutation.mutate(
      { file: data.fileList[0] },
      {
        onSuccess: () => {
          toast.success("Profile Image successfully uploaded!")
        },
        onError: () => {
          toast.error("Error uploading profile image")
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(updateAvatar)} className="space-y-4">
      <div className="flex flex-col gap-3">
        <FormField
          label="Profile Image"
          type="file"
          register={register("fileList", {
            required: { value: true, message: "File is required" },
            validate: validateImageFile<AvatarFormType>(),
          })}
          acceptFileTypes={["image/jpeg", "image/png", "image/webp"]}
          error={errors.fileList}
        />
      </div>
      <Button disabled={uploadAvatarMutation.isPending} type="submit" className="w-full">
        Save
      </Button>
    </form>
  )
}

export default AvatarForm
