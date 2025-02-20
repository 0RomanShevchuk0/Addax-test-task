import { appRoutes } from "@/configs/routes.config"
import { useUser } from "@/hooks/useUser"
import { Link } from "@tanstack/react-router"
import { FC, useState } from "react"
import Button from "../ui/Button"
import { authService } from "@/services/auth.service"
import clsx from "clsx"
import ChevronIcon from "@/assets/icons/chevron.svg"
import defaultAvatar from "@/assets/default-user-avatar.jpeg"

const HeaderProfile: FC = () => {
  const { user, isLoading } = useUser()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  if (isLoading) return <></>

  if (!user) {
    return (
      <Link to={appRoutes.auth}>
        <span className="text-xm">Login</span>
      </Link>
    )
  }

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <img
          className="w-11 h-11 rounded-full object-cover"
          src={user.avatarUrl ?? defaultAvatar}
          alt="Profile"
        />
        <p className="font-semibold">{user.name || user.email}</p>
        <img
          className={clsx("w-2.5 h-2.5 duration-200", isDropdownOpen ? "rotate-90" : "-rotate-90")}
          src={ChevronIcon}
          alt="Chevron icon"
        />
      </div>

      <div
        className={clsx(
          "rounded-xl absolute z-50 bg-white t-0 right-0 w-36 p-3 shadow-lg text-left flex flex-col gap-4 duration-200",
          isDropdownOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-3/4 opacity-0 pointer-events-none"
        )}
      >
        <Link to={appRoutes.profile}>Profile</Link>
        <Button className="w-full text-sm" variant="danger" onClick={authService.logout}>
          Log Out
        </Button>
      </div>
    </>
  )
}

export default HeaderProfile
