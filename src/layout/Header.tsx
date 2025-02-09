import { Link } from "@tanstack/react-router"
import { useUser } from "@/hooks/useUser"
import { appRoutes } from "@/configs/routes.config"

export function Header() {
  const { user, isLoading } = useUser()

  return (
    <header className="p-4 bg-white shadow flex justify-between">
      <h3 className="text-xl">Header</h3>
      <div>
        {!isLoading && (
          <div>
            {user ? (
              <p>{user.email}</p>
            ) : (
              <Link to={appRoutes.auth}>
                <span className="text-xm">Login</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
