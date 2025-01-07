import { Link } from "@tanstack/react-router"
import { FC } from "react"

const Sidebar: FC = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/calendar", label: "Calendar" },
  ]

  const LinkElements = links.map(({ path, label }) => (
    <li key={path}>
      <Link
        to={path}
        className="block p-4 hover:bg-gray-700"
        activeProps={{ style: { fontWeight: "bold" } }}
      >
        {label}
      </Link>
    </li>
  ))

  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Addax</h2>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">{LinkElements}</ul>
      </nav>
    </aside>
  )
}

export default Sidebar
