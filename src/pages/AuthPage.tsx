import { FC, useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import { ReactNode } from "@tanstack/react-router"
import RegisterForm from "@/components/auth/RegisterForm"
import Button from "@/components/ui/Button"

type AuthType = "login" | "register"

type VariationItemType = {
  title: string
  toggleButtonText: string
  form: ReactNode
}

const authFormVariations: Record<AuthType, VariationItemType> = {
  login: {
    title: "Login",
    toggleButtonText: "Don't have an account? Register",
    form: <LoginForm />,
  },
  register: {
    title: "Register",
    toggleButtonText: "Already have an account? Login",
    form: <RegisterForm />,
  },
}

const AuthPage: FC = () => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true)

  const authType: AuthType = isLoginMode ? "login" : "register"
  const { title, form, toggleButtonText } = authFormVariations[authType]

  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl mb-2">{title}</h1>
      {form}
      <Button variant="outline" onClick={() => setIsLoginMode(!isLoginMode)}>
        {toggleButtonText}
      </Button>
    </div>
  )
}

export default AuthPage
