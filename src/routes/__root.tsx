import { createRootRoute, Outlet } from "@tanstack/react-router"
import Sidebar from "../layout/Sidebar"
import { Header } from "../layout/Header"

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex bg-red-400">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden h-full bg-gray-100">
        <Header />
        <div className="p-6 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ),
})
