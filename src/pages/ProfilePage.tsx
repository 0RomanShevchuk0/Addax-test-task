import Button from "@/components/ui/Button"
import FormField from "@/components/ui/FormField"
import { EMAIL_PATTERN } from "@/constants/validation"
import { useUser } from "@/hooks/useUser"
import { useUpdateUser } from "@/hooks/useUserMutation"
import { IUser } from "@/types/user"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-hot-toast"

type ProfileFormType = Omit<IUser, "id">

const EditProfile = () => {
  const { user } = useUser()

  const formValues: ProfileFormType = {
    email: user?.email || "",
    name: user?.name || "",
  }

  const { register, handleSubmit } = useForm<ProfileFormType>({ values: formValues })

  const updateUserMutation = useUpdateUser()

  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-3">
            <FormField label="Name" type="text" register={register("name")} />
            <FormField
              label="Email"
              type="email"
              register={register("email", { required: true, pattern: EMAIL_PATTERN })}
            />
          </div>
          <Button disabled={updateUserMutation.isPending} type="submit" className="w-full">
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
