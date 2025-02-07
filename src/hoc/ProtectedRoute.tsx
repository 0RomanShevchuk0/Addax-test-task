import { FC } from "react"
import { Navigate, ReactNode } from "@tanstack/react-router"
import { useUser } from "../hooks/useUser"
import { appRoutes } from "../configs/routes.config"

type ProtectedRoutePropsType = {
  children: ReactNode
  protectedFrom: "authorized" | "unauthorized"
}

const ProtectedRoute: FC<ProtectedRoutePropsType> = ({ children, protectedFrom }) => {
  const { user, isLoading } = useUser()

  if (isLoading) return <p>Loading...</p>

  if (protectedFrom === "unauthorized" && !user) {
    return <Navigate to={appRoutes.login} />
  }

  if (protectedFrom === "authorized" && user) {
    return <Navigate to={appRoutes.home} />
  }

  return <>{children}</>
}

export default ProtectedRoute
