import { createFileRoute } from "@tanstack/react-router"
import LoginPage from "../pages/LoginPage"
import ProtectedRoute from "../hoc/ProtectedRoute"
import { appRoutes } from "../configs/routes.config"

export const Route = createFileRoute(appRoutes.login)({
  component: () => (
    <ProtectedRoute protectedFrom="authorized">
      <LoginPage />
    </ProtectedRoute>
  ),
})
