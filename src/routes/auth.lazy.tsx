import { createLazyFileRoute } from "@tanstack/react-router"
import AuthPage from "@/pages/AuthPage"
import ProtectedRoute from "@/hoc/ProtectedRoute"
import { appRoutes } from "@/configs/routes.config"

export const Route = createLazyFileRoute(appRoutes.auth)({
  component: () => (
    <ProtectedRoute protectedFrom="authorized">
      <AuthPage />
    </ProtectedRoute>
  ),
})
