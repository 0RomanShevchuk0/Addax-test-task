import { FC } from "react"
import LoginForm from "../components/auth/LoginForm"

const LoginPage: FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl">Login</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage
