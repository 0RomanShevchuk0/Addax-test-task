import HeaderProfile from "@/components/header-profile/HeaderProfile"

export function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow flex justify-between items-center relative">
      <h3 className="text-xl">Header</h3>
      <HeaderProfile />
    </header>
  )
}
