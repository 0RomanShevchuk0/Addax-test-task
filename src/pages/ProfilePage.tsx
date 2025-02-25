import AvatarForm from "@/components/profile/AvatarForm"
import ProfileForm from "@/components/profile/ProfileForm"
import { useUser } from "@/hooks/useUser"
import { useState } from "react"
import defaultAvatar from "@/assets/default-user-avatar.jpeg"
import Button from "@/components/ui/Button"

const EditProfile = () => {
  const { user } = useUser()
  const [isProfileIditing, setIsProfileIditing] = useState(false)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="outline" onClick={() => setIsProfileIditing((prev) => !prev)}>
          {isProfileIditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        {isProfileIditing ? (
          <AvatarForm />
        ) : (
          <img
            className="aspect-square object-cover rounded-md"
            src={user?.avatarUrl || defaultAvatar}
            alt="Avatar"
          />
        )}

        <ProfileForm />
      </div>
    </div>
  )
}

export default EditProfile
