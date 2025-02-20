import { FC } from "react"
import FormField from "../ui/FormField"
import Button from "../ui/Button"
import { SubmitHandler, useForm } from "react-hook-form"
import { useUser } from "@/hooks/useUser"
import { IUser } from "@/types/user"
import { useUpdateUser } from "@/hooks/useUserMutation"
import toast from "react-hot-toast"
import { EMAIL_PATTERN } from "@/constants/validation"

type ProfileFormType = Omit<IUser, "id" | "avatarUrl">

const ProfileForm: FC = () => {
  const { user } = useUser()

  const formValues: ProfileFormType = {
    email: user?.email || "",
    name: user?.name || "",
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>({ values: formValues })

  const updateUserMutation = useUpdateUser()

  const updateProfileData: SubmitHandler<ProfileFormType> = (data) => {
    if (!user) {
      toast.error("User not found")
      return
    }

    updateUserMutation.mutate(
      {
        id: user.id,
        data: {
          name: data.name,
          email: data.email,
        },
      },
      {
        onSuccess: () => {
          toast.success("User successfully updated!")
        },
        onError: () => {
          toast.error("Error updating user")
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit(updateProfileData)} className="space-y-4">
        <div className="flex flex-col gap-3">
          <FormField label="Name" type="text" register={register("name")} error={errors.name} />
          <FormField
            label="Email"
            type="email"
            register={register("email", { required: true, pattern: EMAIL_PATTERN })}
            error={errors.email}
          />
        </div>
        <Button disabled={updateUserMutation.isPending} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  )
}

export default ProfileForm
