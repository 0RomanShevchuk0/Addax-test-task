import { createFileRoute } from '@tanstack/react-router'
import { appRoutes } from '@/configs/routes.config'
// import SettingsPage from '../pages/SettingsPage'

export const Route = createFileRoute(appRoutes.settings)({
  // component: () => <SettingsPage />
})