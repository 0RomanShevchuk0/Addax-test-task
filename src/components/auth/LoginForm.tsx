import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IAuthForm } from "@/types/auth"
import { authService } from "@/services/auth.service"
import FormField from "@/components/ui/FormField"
import Button from "@/components/ui/Button"
import { EMAIL_PATTERN } from "@/constants/validation"
import { useNavigate } from "@tanstack/react-router"
import { appRoutes } from "@/configs/routes.config"
import { appQueries } from "@/configs/querues.config"
import { toast } from "react-hot-toast"
import { STATUS_CODES } from "@/constants/status-codes"

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>()

  const navigate = useNavigate()
  const loginMutation = useMutation({ mutationFn: authService.login })

  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [appQueries.user] })
        toast.success("You're logged in successfully!")
        navigate({ to: appRoutes.home })
      },
      onError: (error: any) => {
        let message = "Incorrect login or password"
        if (error.status !== STATUS_CODES.NOT_AUTHORIZED_401) {
          message = "Failed to login"
        }
        toast.error(message)
        console.error("Login error:", error)
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
      <Button disabled={loginMutation.isPending}>Submit</Button>
    </form>
  )
}

export default LoginForm
