import { Link } from "@tanstack/react-router"
import { FC } from "react"
import { appRoutes } from "@/configs/routes.config"

const links = [
  { path: appRoutes.home, label: "Home" },
  { path: appRoutes.calendar, label: "Calendar" },
  { path: appRoutes.profile, label: "Settings" },
]

const Sidebar: FC = () => {
  const LinkElements = links.map(({ path, label }) => (
    <li key={path}>
      <Link
        to={path}
        className="block p-4 text-[#E0E0E0] hover:text-[#B3B3B3] hover:bg-[#2A2A2A]"
        activeProps={{ style: { fontWeight: "bold", color: "#8e8de9" } }}
      >
        {label}
      </Link>
    </li>
  ))

  return (
    <aside className="w-64 h-full bg-[#181818] text-white flex flex-col">
      <div className="p-4">
        <Link to={appRoutes.home} className="text-white hover:text-white">
          <h2 className="text-xl font-bold">Sidebar</h2>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">{LinkElements}</ul>
      </nav>
    </aside>
  )
}

export default Sidebar
