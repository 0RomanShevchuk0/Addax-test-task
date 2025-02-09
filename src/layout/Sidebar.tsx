import { Link } from "@tanstack/react-router"
import { FC } from "react"
import { appRoutes } from "@/configs/routes.config"

const Sidebar: FC = () => {
  const links = [
    { path: appRoutes.home, label: "Home" },
    { path: appRoutes.calendar, label: "Calendar" },
    { path: appRoutes.settings, label: "Settings" },
  ]

  const LinkElements = links.map(({ path, label }) => (
    <li key={path}>
      <Link
        to={path}
        className="block p-4 hover:bg-gray-700"
        activeProps={{ style: { fontWeight: "bold", color: "white" } }}
      >
        {label}
      </Link>
    </li>
  ))

  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <Link to={appRoutes.home} className="text-white hover:text-white">
          <h2 className="text-xl font-bold">Addax</h2>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">{LinkElements}</ul>
      </nav>
    </aside>
  )
}

export default Sidebar
