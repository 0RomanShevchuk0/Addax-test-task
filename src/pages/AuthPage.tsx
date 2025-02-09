import { FC, useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import { ReactNode } from "@tanstack/react-router"
import RegisterForm from "@/components/auth/RegisterForm"
import Button from "@/components/ui/Button"

type AuthType = "login" | "register"

type VariationItemType = {
  title: string
  buttonText: string
  form: ReactNode
}

const variations: Record<AuthType, VariationItemType> = {
  login: {
    title: "Login",
    buttonText: "Already have an account? Login",
    form: <LoginForm />,
  },
  register: {
    title: "Register",
    buttonText: "Don't have an account? Register",
    form: <RegisterForm />,
  },
}

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const type: AuthType = isLogin ? "login" : "register"
  const { title, form, buttonText } = variations[type]

  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl mb-2">{title}</h1>
      {form}
      <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
        {buttonText}
      </Button>
    </div>
  )
}

export default AuthPage
