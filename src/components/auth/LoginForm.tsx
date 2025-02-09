import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IAuthForm } from "@/types/auth"
import { authService } from "@/services/auth.service"
import FormField from "@/components/ui/FormField"
import Button from "@/components/ui/Button"
import { EMAIL_REGEX } from "@/constants/validation"
import { useNavigate } from "@tanstack/react-router"
import { appRoutes } from "@/configs/routes.config"
import { appQueries } from "@/configs/querues.config"

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
      onSuccess: (response) => {
        console.log("Login success:", response)
        queryClient.invalidateQueries({ queryKey: [appQueries.user] })
        navigate({ to: appRoutes.home })
      },
      onError: (error) => {
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
          pattern: {
            value: EMAIL_REGEX,
            message: "Invalid email format",
          },
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
