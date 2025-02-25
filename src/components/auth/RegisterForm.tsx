import { appQueries } from "@/configs/querues.config"
import { appRoutes } from "@/configs/routes.config"
import { authService } from "@/services/auth.service"
import { IAuthForm } from "@/types/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import FormField from "../ui/FormField"
import { EMAIL_PATTERN } from "@/constants/validation"
import Button from "../ui/Button"
import toast from "react-hot-toast"

interface IRegisterForm extends IAuthForm {
  confirmPassword: string
}

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegisterForm>()

  const navigate = useNavigate()
  const loginMutation = useMutation({ mutationFn: authService.register })
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" })
      return
    }

    const submitData: IAuthForm = {
      email: data.email,
      password: data.password,
    }

    loginMutation.mutate(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [appQueries.user] })
        navigate({ to: appRoutes.home })
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || "Something went wrong"

        toast.error(errorMessage)
        console.error("Login error:", errorMessage)
      },
    })
  }

  return (
    <form className="flex flex-col gap-3 w-1/4" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Email"
        type="text"
        register={register("email", {
          required: true,
          pattern: EMAIL_PATTERN,
        })}
        error={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        register={register("password", { required: true })}
        error={errors.password}
      />
      <FormField
        label="Confirm password"
        type="password"
        register={register("confirmPassword", { required: true })}
        error={errors.confirmPassword}
      />
      <Button disabled={loginMutation.isPending}>Submit</Button>
    </form>
  )
}

export default RegisterForm
