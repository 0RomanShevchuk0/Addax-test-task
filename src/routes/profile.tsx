import { createFileRoute } from "@tanstack/react-router"
import { appRoutes } from "@/configs/routes.config"
import SettingsPage from "../pages/ProfilePage"
import ProtectedRoute from "@/hoc/ProtectedRoute"

export const Route = createFileRoute(appRoutes.profile)({
  component: () => (
    <ProtectedRoute protectedFrom="unauthorized">
      <SettingsPage />
    </ProtectedRoute>
  ),
})
