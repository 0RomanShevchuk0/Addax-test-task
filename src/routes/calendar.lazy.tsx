import { createLazyFileRoute } from "@tanstack/react-router"
import CalendarPage from "../pages/СalendarPage"
import ProtectedRoute from "../hoc/ProtectedRoute"
import { appRoutes } from "../configs/routes.config"

export const Route = createLazyFileRoute(appRoutes.calendar)({
  component: () => (
    <ProtectedRoute protectedFrom="unauthorized">
      <CalendarPage />
    </ProtectedRoute>
  ),
})
